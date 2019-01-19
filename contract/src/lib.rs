#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate smart_contract;

use smart_contract::activation::CustomActivation;
use smart_contract::persistent;
use smart_contract::Reason;

#[derive(Deserialize)]
pub enum Payload {
    // Unregistered only.
    Register,

    // Admin-only.
    ResetRep { address: String },

    // VIP-only.
    PlusRep { address: String, report_id: String },
    NegRep { address: String, report_id: String },

    // Normal-only.
    UpgradeToVIP,

    // All.
    Deposit { amount: u64 },

    // Backend-only.
    RegisterScamReport { report_id: String },
}

#[no_mangle]
fn handle_activation() {
    let reason: Option<Reason<Box<serde_json::value::RawValue>>> = Reason::load();

    match reason {
        Some(reason) => match reason.kind.as_str() {
            "custom" => {
                let activation: CustomActivation<Payload> =
                    match serde_json::from_str(reason.details.get()) {
                        Ok(v) => v,
                        Err(_) => return,
                    };

                let sender = reason.sender;
                let payload = activation.body;

                match payload {
                    Payload::Register => {
                        if persistent::get(&format!("account:{:?}:balance", sender)).len() == 0 {
                            let bytes: [u8; 8] = unsafe { std::mem::transmute(0u64.to_be()) };

                            persistent::set(&format!("account:{:?}:balance", sender), &bytes)
                        }
                    }
                    Payload::ResetRep { address } => {}

                    Payload::PlusRep { address, report_id } => {}
                    Payload::NegRep { address, report_id } => {}

                    Payload::UpgradeToVIP {} => {}

                    Payload::Deposit { amount } => {}

                    Payload::RegisterScamReport { report_id } => {}
                }
            }
            _ => {}
        }
        None => {}
    }
}

contract_entry!(handle_activation);