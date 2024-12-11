<script>
import { GoogleMap, Polyline  } from 'vue3-google-map'
import { Secrets } from '../../../core/utils/secrets';
import { decode } from '@mapbox/polyline';

export default {
    components: {
        GoogleMap,
        Polyline
    },
    data() {
        return {
            apiKey: '',
            restrictions: {
                clickableIcons: false,
                disableDefaultUI: true,
                mapId: '21982fcaf227d4c8',
                minZoom: 12,
                maxZoom: 21,
                startZoom: 13,
                center: { lat: 42.485444, lng: 27.448780 },
                bounds: {
                    latLngBounds:
                    {
                        north: 42.485444,
                        south: 42.485444,
                        east: 27.448780,
                        west: 27.448780
                    },
                    strictBounds: true
                }
            },
            testLine:
                {
                    path: undefined,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                }
        }
    },
    beforeMount() {
        let stringPath = 'qmqbGc}qfDNFh@CgBiHoBoH]{AgA{EGUtBW??DAzCi@`Ds@TMbD}D??hCkDlFzDf@^hC`C??lCpCvCbEPLvCuKp@oBVi@TWlAiBNPHHbAdA??`HvHdBpBdB`BTTX^Rf@Rp@Vx@X|@?\\DZLZRTVNL@XAVKTSPe@Nw@DMLQdCyBdDyC|@{@??nCcCrD_DjBgBzCoCrC}BFAlDwClB}AzEmC~@]LMjA]??|GkBpGmB~EmAR@bCm@`@Kp@pETrB?@f@lEEd@BRnFqAHKnCm@tEmAfD{@tJgCbCs@hC}@hCw@??tAg@fCy@RKx@s@^]|D}AzBaATIFuBAmDOqJAe@tB?\\AF?Eh@?bD?cDDi@G?]@uB?@d@FtFFzB@lDGtB?t@NlA\\xCfAlHlAdILzBGfBs@dIGNQ~@qBhKKj@a@xAM`A?t@j@jF|@vHl@lFb@zFBzBIx@Op@Ib@?@eAjBm@hAwA~BeCxDuAjCw@pAs@nAMV^b@rAfBbExEjIhJtYv\\~I~JfEjEnBfBhCtBjChB`DjBz@d@PJzAl@vAf@hBf@tA^bCb@`AHr@\\v@FpGR~DTJJZRTF`@DZ?ZR^\\Xp@H^RdDf@rJPxD?Ft@jOTtBl@hCj@zA\\t@b@v@p@|@x@`AtAhA~FzDx@h@t@v@hA|A\\l@t@`Bd@zA`@pBRbBTzC`A`JTnBRfAVnA`@xA`AfClAxB`FnGpA~A~@o@\\Sp@IpDE??pDE\\AnA_@b@UpCoB|BaBrDsC??lA_AfH_FpLkI??hKqHf@zAd@n@ZX~@b@z@Zn@Zf@t@';
        this.testLine.path = decode(stringPath).map((point) => {
            return {
                lat: point[0],
                lng: point[1]
            };
        });
        this.apiKey = Secrets.getGoogleMapsApiKey();
    }
}
</script>

<template>
    <GoogleMap 
        :api-key="apiKey" 
        :center="restrictions.center"
        :map-id="restrictions.mapId"
        :zoom="restrictions.startZoom"
        :clickableIcons="restrictions.clickableIcons" 
        :disable-default-ui="restrictions.disableDefaultUI"
        :min-zoom="restrictions.minZoom"
        :max-zoom="restrictions.maxZoom"
        :restriction="restrictions.bounds"
        class="h-screen w-full"
        >
        <Polyline :options="testLine" />
    </GoogleMap>
</template>