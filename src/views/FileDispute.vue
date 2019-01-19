<template>
    <div class="box">
        <div class="box-title">File Dispute</div>
        <div>
            <v-select v-model="chain" :options="chains" label="displayName" placeholder="Chain" class="mb3"/>

            <div class="mb3">
                <span>Your Address</span>
                <input class="text-input" style="width: 100%" v-model="userAddress">
            </div>

            <div class="mb3">
                <span>Scammer's Address</span>
                <input class="text-input" style="width: 100%" v-model="scammerAddress">
            </div>

            <span>Description</span>

            <markdown-editor v-model="description" ref="markdownEditor"></markdown-editor>

            <button
                    class="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-purple"
                    @click="doSubmit()"
                    v-if="canSubmit">
                Submit
            </button>

            <button
                    class="f6 link dim br3 ph3 pv2 mb2 dib white bg-gray"
                    @click="doSubmit()"
                    disabled
                    v-if="!canSubmit">
                Submit
            </button>
        </div>
    </div>
</template>

<style scoped>
    @import "~simplemde/dist/simplemde.min.css";
</style>

<script>
    import "./Safu.css";
    import api from "../api.js";
    import markdownEditor from "vue-simplemde/src/markdown-editor";

    export default {
        components: {
            markdownEditor
        },
        computed: {
            canSubmit() {
                return (
                    this.userAddress &&
                    this.scammerAddress &&
                    this.chain &&
                    this.description &&
                    !this.doingSubmit
                );
            }
        },
        data() {
            return {
                userAddress: "",
                scammerAddress: "",
                description: "",
                doingSubmit: false,
                chain: null,
                chains: [
                    {
                        id: "eth",
                        displayName: "Ethereum"
                    },
                ],

                async doSubmit() {
                    this.doingSubmit = true;
                    try {
                        await api.submitDispute({
                            userAddress: this.userAddress,
                            scammerAddress: this.scammerAddress,
                            description: this.description,
                            chain: this.chain.id
                        });
                        this.scammerAddress = "";
                        this.description = "";
                    } finally {
                        this.doingSubmit = false;
                    }
                }
            };
        },
        async mounted() {
        }
    };
</script>