<template>
    <Layout>
        <div v-if="report" class="pa3">
            <div class="cf w-100">
                <div class="fl w-25 pr2">
                    <div class="w-100 tl f2">
                        Submitter
                    </div>

                    <div class="outline bg-white mt3">
                        <div class="pa2">
                            <code class="f7 w-100 h-25 nowrap fl bg-black-20 pa2 ws-normal overflow-hidden dib">0x3jg4sff02bae6764991eefe53360a0a09be53887b2d3900d02c00a3858</code>
                        </div>

                        <div class="mt4 mb3 pl3 outline pv2">
                            <div class="dt w-100">
                                <div class="dtc w-50">
                                    <span class="f6">Reputation</span>
                                </div>

                                <div class="dtc w-50 pr3 tr">
                                    <a href="#" class="f6 black-50 dib">16</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fl w-75 pl2">
                    <span class="f2 black-60">{{report.title}}</span>

                    <div class="mt3 outline pa3">
                        <vue-markdown class="overflow-y-auto" style="max-height: 350px;">{{report.content}}
                        </vue-markdown>
                    </div>

                    <div class="dt w-100 mt3">
                        <div class="dtc w-40">
                            <span>Reputation given [total report score: {{reportScore}}]:</span>
                        </div>

                        <div class="dtc w-60">
                            <div v-for="(rep, i) in reps" :key="i" class="pa2 mb3 bg-black-10 outline tooltip mr2"
                            :class="rep.type === '+' ? ['bg-green', 'white'] : ['bg-light-red', 'white']">
                                <span class="tooltipText">{{rep.from}} gave {{rep.type}}rep to {{rep.to}}.<br/><b>reason:</b> {{rep.reason}}</span>
                                {{rep.from}}
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Layout from "./Layout";
    import VueMarkdown from 'vue-markdown'

    export default {
        data() {
            return {
                reps: [
                    {
                        from: "alice",
                        to: "bob",
                        type: "+",
                        reason: "good report, very detailed."
                    },
                    {
                        from: "charles",
                        to: "bob",
                        type: "+",
                        reason: "good report, very detailed."
                    },
                    {
                        from: "dania",
                        to: "bob",
                        type: "-",
                        reason: "don't agree."
                    }
                ]
            }
        },
        components: {
            Layout,
            VueMarkdown
        },
        computed: {
            report() {
                return this.$store.getters.reportById(this.$route.query.id);
            },
            reportScore() {
                const score = _.reduce(this.reps, (acc, rep) => acc += rep.type === "+" ? 1 : -1, 0);
                return score > 0 ? ("+" + score) : score;
            }
        }
    }
</script>

<style>
    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .tooltip .tooltipText {
        width: 360px;
        background-color: black;
        color: #fff;
        text-align: left;
        border-radius: 6px;
        padding: 5px 0 5px 10px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -180px;

        opacity: 0;
        transition: opacity 1s;
    }

    .tooltip .tooltipText::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border: 5px solid transparent;
        border-top-color: black;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltipText {
        opacity: 1;
    }
</style>