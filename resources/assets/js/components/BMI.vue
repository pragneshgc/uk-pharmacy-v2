<template>
    <div class="bmi-indicator">
        <div class="bmi-indicator__section" style="background: #f5d55e;" title="Under Weight">
            <div class="bmi-indicator__explain" v-html="'<18.5'"></div>
            <div class="bmi-indicator__line" v-if="bmi < 18.5" :style="{'left': percentage(0,18.5,bmi)+'%'}"></div>
        </div>
        <div class="bmi-indicator__section" style="background: #5ab268;" title="Normal Weight">
            <div class="bmi-indicator__explain" v-html="'18.5 - 24.9'"></div>
            <div class="bmi-indicator__line" v-if="bmi >= 18.5 && bmi <= 24.9" :style="{'left': percentage(18.5,24.9,bmi)+'%'}"></div>
        </div>
        <div class="bmi-indicator__section" style="background: #6cbfe7;" title="Over Weight">
            <div class="bmi-indicator__explain" v-html="'25 - 29.9'"></div>
            <div class="bmi-indicator__line" v-if="bmi >= 25 && bmi <= 29.9" :style="{'left': percentage(25,29.9,bmi)+'%'}"></div>
        </div>
        <div class="bmi-indicator__section" style="background: #f5a84c;" title="Obese Type I">
            <div class="bmi-indicator__explain" v-html="'30 - 34.9'"></div>
            <div class="bmi-indicator__line" v-if="bmi >= 30 && bmi <= 34.9" :style="{'left': percentage(30,34.9,bmi)+'%'}"></div>
        </div>
        <div class="bmi-indicator__section" style="background: #f6905f;" title="Obese Type II">
            <div class="bmi-indicator__explain" v-html="'35 - 39.9'"></div>
            <div class="bmi-indicator__line" v-if="bmi >= 35 && bmi <= 39.9" :style="{'left': percentage(35,39.9,bmi)+'%'}"></div>
        </div>
        <div class="bmi-indicator__section" style="background: #d84f56;" title="Obese Type III">
            <div class="bmi-indicator__explain" v-html="'>40'"></div>
            <div class="bmi-indicator__line" v-if="bmi >= 40" :style="{'left': percentage(40,44.9,bmi)+'%'}"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bmi: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            products: {},
            errors: {},
        }
    },
    methods: {
        percentage(min, max, current){
            return 100 - ((max + (current*(-1))) * 100 / (max - min));
        },
    },
}
</script>