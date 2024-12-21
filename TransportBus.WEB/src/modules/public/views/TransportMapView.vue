<script>
import TransportMap from '../components/TransportMap.vue'
import { useStopsStore } from '../../../core/stores/stopsStore'
import Loading from 'vue-loading-overlay';

export default {
    components: {
        TransportMap,
        Loading
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            hasData: false,
            routes: [
                {
                    path: 'olbbG{djfDb@dCZOtBgAa@{@m@_Ao@[{@[_Ac@[Ye@o@g@{AMc@mJ~G??mM~IcHhFi@\\??wEhDmGzEiBj@a@DkCJ??mD@iADYHYNw@d@aCwCoCoDc@m@kAyBq@gBw@{CSiAWgC{@qIa@eEa@eCWiAg@sA_@u@Uc@w@qA{AcBoDeCoCeBqBiBc@g@s@eA[k@_@}@a@oAk@kCUmBE}@HgE?eBMuCaA}J??c@qEU}CQuCCMFKBIHm@@e@G_@Wi@MOWM{@Om@@]HUNMJMVCJONYNyCJoB?wBIeDQU@UFs@MsBa@qAa@cA[_A[y@[mCsAgEkCgCiBeGuFqHeIyH}IePaRsK}LgFgGaBoBM{@AcA?YZi@pBsDrD{FjAsB~@cBNY??@CxAgBmF}f@|A{GbB}I|@}LSqC_EsY@i@DcHrA[LODS@eA??VOYGBwFcC@NtKAzFIj@{h@rR??_FlAaCp@_Cj@oCl@OC_B^}Bh@Ia@QqBQoAYaCa@oCU}AeDdAMLmBd@{EpA_ElAuCv@??{DfAOC_@Hs@Vo@T}At@y@`@yBrA{AjAyAtAyAjB{CjCiBvA{@v@oC~Bc@^oCvB??}KvHEDGC[GO?o@c@[MWQsAyA}EiF_AeA??mImJiA~ASj@Gd@m@zA[|@wCtKeBuBcA{AaCcCoCiC??}BcByBcBc@YONqAjB{AjB??oB`CULaDr@{Ch@}@LA?{@JFTfAzE\\zAnBnHJh@KL',
                    color: '#333333',
                    "stops": [
                        131,
                        136,
                        138,
                        140,
                        142,
                        144,
                        146,
                        148,
                        150,
                        110,
                        112,
                        124,
                        126,
                        128,
                        132,
                        135
                    ],
                },
                {
                    path: '}robGganfDOKa@IkBMs@SUSd@eAV]TBRGJKFQBc@G[AQfCaI~@mDRq@??z@gCjCgHjAiDv@}BXk@\\k@`@m@r@gBdCsHdAuD|@mC??hB{FzDgLn@gB??fG_QBIMKu@u@oBaB{AuAqDaDYW_DoIMu@C]?[F]`FoEFG??tBiB`CqBXCx@]b@Cj@GzCf@d@Rr@LhFv@tGbA`C^\\?zDj@jC`@^FVLrAZ\\HPDHHJTAF@LDJFJLFP?PGFGBGVJp@f@RLr@l@??TTj@l@Pd@HNDHFr@FTNNHBPVL\\`@pDJt@d@dAt@~AX`@PTr@QvBg@P@b@IZ?hAFj@@ZIRCTGJIzA[??vKkCxNoDbGyA??bCo@zDaA^QHEZ?XDPF?SBm@l@yBbAiF`A}EAUXsC?ABYH_AJuADs@@[?I?MAOKkBUsAw@qFo@oEW}ACSYeCOmA?u@D{A@Y?U?W?[AcBr@Md@OLOBO?cEVEU???AU?cABu@aC?[oDiAaH??i@wCSaA[y@Yc@k@s@i@y@Y[_BwAiA{@aAYYCiD`@_F`@aARkBRiD^eALo@HMBe@Gi@Kk@AqD]oFi@??iD[aCSmCIgAK}@CmAE_DF{Cl@{@VgBt@_B~@WT_Az@i@d@UZUX]d@{GvJyAvB??iD~Fs@rAQf@K`@UlAGJGBSI_@[GMM?MAKBQN[hAaA~B??iBnE_@|@s@jAy@x@mC|Aq@\\aAt@cBdAoAl@g@\\KD??qAl@k@T{A^[HmC\\kAHcADc@~F_AtBi@r@SH}@b@}BxAs@f@iA~ASj@Gd@m@zAYv@??ADwCtKQMwCcEmEmEcA_A??}BcByBcBc@YONqAjBa@h@y@`AAA??aOxF???B{@J_@NQL]Zk@n@bApEd@bBdCpJjBnHZhB`@bB??FXbAzDVt@Nd@J^FRh@lBjArDHNDJBH@DDTBPBV@V?L?J@J?N?BAB?B?L?F@D@FDLBHBFFFDBHDB?D@B?D?ZTv@l@LJHLbA|B@Bt@jB`@dAdAnCTh@?@Pb@b@dARd@Xr@@BUPURsAfAaAv@GJGJWn@c@`AGHq@fAU\\w@hAc@n@a@n@CE??c@x@YjA\\HtBQ?@AGTJvBdAnEbCPaEZ{Bn@kCpAwBFCjB|DfFhJ??@Ax@tAj@pAx@dBN`@pCbHh@rAFRBJCFEHCV@VFRLLPFT?HEv@x@h@h@r@b@lBx@?b@CJAB',
                    color: '#199999',
                    "stops": [
                        134,
                        93,
                        91,
                        99,
                        103,
                        203,
                        307,
                        197,
                        334,
                        336,
                        317,
                        339,
                        340,
                        220,
                        218,
                        216,
                        214,
                        201,
                        45,
                        116,
                        118,
                        120,
                        206,
                        291,
                        368,
                        94,
                        135
                    ],
                }
            ]
        }
    },
    computed: {
        IsBusy() {
            return !this.hasData;
        }
    },
    async created() {
        await this.stopsStore.fetchStops();
        this.hasData = true;
        this.$refs.map.init();
    }
}
</script>

<template>
    <Loading 
        :active="true" 
        v-if="isLoading"
        :can-cancel="false" 
        class="flex flex-row min-h-screen justify-center items-center"
        :is-full-page="true" />
    <TransportMap :routes="routes" v-else ref="map"/>
</template>