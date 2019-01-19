<template>
    <Layout>
        <div v-if="report" class="pa3">
            <div class="cf w-100">
                <div class="fl w-25 pr2">
                    <div class="outline bg-white">
                        <div class="tc" style="min-height: 270px">
                            <img src="http://lorempixel.com/512/512/nature?#2"/>
                        </div>

                        <div class="pb0">
                            <code class="f7 w-100 h-25 nowrap fl bg-black-20 pa2 ws-normal overflow-hidden dib">0x3jg4sff02bae6764991eefe53360a0a09be53887b2d3900d02c00a3858</code>
                        </div>

                        <div class="mt4 mb3 pl3 outline pv2">
                            <div class="dt w-100">
                                <div class="dtc w-50">
                                    <span class="f6">Reputation</span>
                                </div>

                                <div class="dtc w-50 pr3 tr">
                                    <a href="#" class="f6 black-50 dib">300</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fl w-75 pl2">
                    <span class="f3">{{report.title}}</span>

                    <div class="mt3 outline pa3">
                        <vue-markdown>{{report.content}}</vue-markdown>
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
        components: {
            Layout,
            VueMarkdown
        },
        computed: {
            report() {
                return this.$store.getters.reportById(this.$route.query.id);
            }
        }
    }
</script>