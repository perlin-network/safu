<template>
    <Layout>
            <nav class="dt w-100 pt3 ph3 pb3">
                <span class="dtc f3 w-25">Reports</span>

                <div class="dtc w-75 tr">
                    <select class="mr3 pv2 pl2 w-30 bg-white b--black">
                        <option selected class="tl">Sort by...</option>
                    </select>

                    <router-link to="/file"><button class="bg-white pv2 ph5 b--black pointer">File Dispute</button></router-link>
                </div>
            </nav>

            <div v-for="report in $store.state.reports" class="dt w-100 bg-black-10 pa3 b--black bw5" style="border-color: black; border-top: 1px solid black;">
                <span class="w-50 dtc f4"><span class="f5 black-50 mr2">today 3:47PM</span> {{report.title}}</span>

                <div class="dtc w-50 tr">
                    <span class="f4 black-50 mr3">Severity: {{report.severity}}</span>
                </div>
            </div>
    </Layout>
</template>

<script>
    import "tachyons/css/tachyons.css";
    import Layout from "./Layout";

    export default {
        name: 'home',
        components: {Layout}
    }
</script>