<template>
    <div>
        <nav class="dt w-100 border-box pv3">
            <a class="dtc v-mid black" href="#" title="Home">
                <h1 class="dib">SAFU</h1>
            </a>
            <div class="dtc v-mid w-75 tr">
                <a class="link dim dark-gray f4 mr4 dib" href="#" title="Reports">Reports</a>
                <a class="link dim dark-gray f4 mr4 dib" href="#" title="Admin CP">Admin CP</a>
            </div>
        </nav>

        <div class="cf w-100">
            <div class="fl w-25 pr2">
                <div class="outline bg-white">
                    <div class="tc pb2" style="min-height: 375.35px">
                        <img src="http://lorempixel.com/512/512/nature"/>
                    </div>

                    <div class="pb3">
                        <code class="f7 w-100 h-25 nowrap fl bg-black-20 pa2 ws-normal overflow-hidden dib">0x71e6c9b83a7ef02bae6764991eefe53360a0a09be53887b2d3900d02c00a3858</code>
                    </div>

                    <div class="mt4 mb3 pl3 outline pv3">
                        <div class="dt w-100">
                            <div class="dtc w-50">
                                <span class="f4">Reputation</span>
                            </div>

                            <div class="dtc w-50 pr3 tr">
                                <a href="#" class="f3 black-50 dib">300</a>
                            </div>
                        </div>
                    </div>

                    <div class="ph3 pb3">
                        <button class="bg-white tc pa2 w-100 b--black-40 pointer">Query</button>
                    </div>

                    <div class="ph3 pb3">
                        <button class="bg-white tc pa2 w-100 b--black-40 pointer">Logout</button>
                    </div>
                </div>
            </div>

            <div class="fl w-75 pl2">
                <div class="outline bg-white">
                    <nav class="dt w-100 pt3 ph3 pb3">
                        <span class="dtc f3 w-25">Reports</span>

                        <div class="dtc w-75 tr">
                            <select class="mr3 pv2 pl2 w-30 bg-white b--black">
                                <option selected class="tl">Sort by...</option>
                            </select>

                            <button class="bg-white pv2 ph5 b--black">File Dispute</button>
                        </div>
                    </nav>

                    <div v-for="report in reports" class="dt w-100 bg-black-10 pa3 b--black bw5" style="border-color: black; border-top: 1px solid black;">
                        <span class="w-25 dtc f4">{{report.title}}</span>

                        <div class="dtc w-75 tr">
                            <span class="f4 black-50">Severity: {{report.severity}}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "tachyons/css/tachyons.css";

    export default {
        name: 'home',
        data() {
            return {
                someText: "bla",
                reports: [
                    {
                        title: "help! i got scamedz",
                        severity: "LOW"
                    },
                    {
                        title: "Test Title",
                        severity: "HIGH"
                    }
                ]
            }
        }
    }
</script>