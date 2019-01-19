#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate smart_contract;

use smart_contract::activation::{CustomActivation, TransferActivation};
use smart_contract::persistent;
use smart_contract::Reason;

#[derive(Deserialize)]
pub enum Payload {
    // Unregistered only.
    Register,

    // Admin-only.
    ResetRep { target_address: String },

    // VIP-only.
    PlusRep { target_address: String, report_id: String },
    NegRep { target_address: String, report_id: String },

    // Normal-only.
    UpgradeToVIP,

    // Backend-only.
    RegisterScamReport { report_id: String },
}

fn account_load(user: &Vec<u8>) -> Option<Account> {
    let data = persistent::get(&format!("{:?}", user));

    if data.len() == 0 {
        None
    } else if let Ok(acc) = serde_json::from_slice(&data) {
        Some(acc)
    } else {
        None
    }
}

fn account_save(user: &Vec<u8>, account: &Account) {
    persistent::set(&format!("{:?}", user), &serde_json::to_vec(account).unwrap())
}

fn report_exists(report_id: &Vec<u8>) -> bool {
    let data = persistent::get(&format!("report_exists:{:?}", report_id));

    data.len() == 0
}

fn register_report(report_id: &Vec<u8>) {
    persistent::set(&format!("report_exists:{:?}", report_id), &vec![1u8, 3u8, 3u8, 7u8]);
}


#[derive(Serialize, Deserialize, Clone)]
struct Reputation {
    effect: ReputationEffect,
    report_id: String,
}

#[derive(Serialize, Deserialize, Eq, PartialEq, Clone)]
enum ReputationEffect {
    Positive,
    Negative,
}

#[derive(Serialize, Deserialize, Eq, PartialEq)]
enum Role {
    Member,
    VIP,
    Admin,
}

#[derive(Serialize, Deserialize)]
struct Account {
    balance: u64,
    role: Role,
    reputation_received: Vec<Reputation>,
}

const UPGRADE_TO_VIP_MINIMUM_REPUTATION: i64 = 20;
const UPGRADE_TO_VIP_PERLS_COST: i64 = 1000;

#[no_mangle]
fn handle_activation() {
    let reason: Option<Reason<Box<serde_json::value::RawValue>>> = Reason::load();

    match reason {
        Some(reason) => match reason.kind.as_str() {
            "transfer" => {
                let activation: TransferActivation = match serde_json::from_str(reason.details.get()) {
                    Ok(v) => v,
                    Err(_) => return,
                };

                let sender = reason.sender;

                if !account_load(&sender).is_some() {
                    account_save(&sender, &Account { balance: 0u64, role: Role::Member, reputation_received: vec![] })
                }

                let mut account = account_load(&sender).unwrap();

                    account.balance += activation.amount;
                    account_save(&sender, &account);
            }
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
                        if let None = account_load(&sender) {
                            account_save(&sender, &Account { balance: 0u64, role: Role::Member, reputation_received: vec![] });
                        }
                    }
                    Payload::ResetRep { target_address } => {
                        if let Some(account) = account_load(&sender) {
                            match account.role {
                                Role::Admin => {
                                    if let Some(mut target) = account_load(&target_address.clone().into()) {
                                        target.reputation_received = target.reputation_received.iter()
                                            .filter(|rep| rep.effect == ReputationEffect::Negative)
                                            .cloned()
                                            .collect();

                                        account_save(&target_address.into(), &target)
                                    }
                                }
                                _ => return
                            }
                        }
                    }

                    Payload::PlusRep { target_address, report_id } => {
                        if let Some(from) = account_load(&sender) {
                            if from.role == Role::VIP {
                                if let Some(mut to) = account_load(&target_address.clone().into()) {
                                    if report_exists(&report_id.clone().into()) {
                                        to.reputation_received.push(Reputation { effect: ReputationEffect::Positive, report_id });

                                        account_save(&target_address.into(), &to)
                                    }
                                }
                            }
                        }
                    }
                    Payload::NegRep { target_address, report_id } => {
                        if let Some(from) = account_load(&sender) {
                            if from.role == Role::VIP {
                                if let Some(mut to) = account_load(&target_address.clone().into()) {
                                    if report_exists(&report_id.clone().into()) {
                                        to.reputation_received.push(Reputation { effect: ReputationEffect::Negative, report_id });

                                        account_save(&target_address.into(), &to);
                                    }
                                }
                            }
                        }
                    }

                    Payload::UpgradeToVIP {} => {
                        if let Some(mut account) = account_load(&sender) {
                            if account.role == Role::Member {
                                if account.reputation_received.iter()
                                    .fold(0, |sum, val| {
                                        sum + (if val.effect == ReputationEffect::Positive { 1 } else { -1 })
                                    }) >= UPGRADE_TO_VIP_MINIMUM_REPUTATION {

                                    if account.balance as i64 > UPGRADE_TO_VIP_PERLS_COST {
                                        account.role = Role::VIP;
                                        account.balance = (account.balance as i64 - UPGRADE_TO_VIP_PERLS_COST) as u64;

                                        account_save(&sender, &account);
                                    }
                                }
                            }
                        }
                    }

                    Payload::RegisterScamReport { report_id } => {
                        register_report(&report_id.into());
                    }
                }
            }
            _ => {}
        }
        None => {}
    }
}

contract_entry!(handle_activation);