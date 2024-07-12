<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>New User</h3>
            </div>
            <!-- Grid Row -->
            <div class="card-body">
                <form class="text-center p-5" v-on:submit.prevent="save">

                    <p class="h4 mb-3">New User</p>

                    <div class="row mb-3">
                        <div class="col-lg-6 mb-10">
                            <!-- Name -->
                            <input valid autocomplete="off" v-model="data.name" type="text" id="defaultContactFormName"
                                class="form-control tBoxSize02" placeholder="Name">
                            <div v-if="errors.name" class="invalid-feedback d-block">{{ errors.name[0] }}</div>
                        </div>
                        <div class="col-lg-6 mb-10">
                            <!-- Surname -->
                            <input autocomplete="off" v-model="data.surname" type="text" id="defaultContactFormSurnname"
                                class="form-control tBoxSize02" placeholder="Surname">
                            <div v-if="errors.surname" class="invalid-feedback d-block">{{ errors.surname[0] }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-lg-6 mb-10">
                            <!-- Email -->
                            <input autocomplete="off" v-model="data.email" type="email" id="defaultContactFormEmail"
                                class="form-control tBoxSize02" placeholder="E-mail">
                            <div v-if="errors.email" class="invalid-feedback d-block">{{ errors.email[0] }}</div>
                        </div>
                        <div class="col-lg-6 mb-10">
                            <!-- Role -->
                            <select v-model="data.role" class="browser-default custom-select">
                                <option v-for="(item, index) in roles" :value="index" :key="index">
                                    {{ item }}
                                </option>
                            </select>
                            <!-- <select v-model="data.role" class="browser-default custom-select">
                                <option value="4">Product Management</option>
                                <option value="5">Shipping</option>
                                <option value="10">PXP</option>
                                <option value="19">Locum Dispenser</option>
                                <option value="20">Dispenser</option>
                                <option value="29">Locum Pharmacist</option>
                                <option value="30">Pharmacist</option>
                                <option value="35">Superintendent Pharmacist</option>
                                <option value="40">Customer Service</option>
                                <option value="50">Admin</option>
                            </select> -->
                            <div v-if="errors.role" class="invalid-feedback d-block">{{ errors.role[0] }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-lg-6 mb-10">
                            <input autocomplete="off" v-model="data.password" type="password" name="password"
                                id="password" class="form-control tBoxSize02" placeholder="Password">
                            <div v-if="errors.password" class="invalid-feedback d-block">{{ errors.password[0] }}</div>
                        </div>
                        <div class="col-lg-6 mb-10">
                            <input autocomplete="off" v-model="data.passwordRepeat" type="password"
                                name="password-repeat" id="passwordRepeat" class="form-control tBoxSize02"
                                placeholder="Repeat Password">
                            <div v-if="errors.passwordRepeat" class="invalid-feedback d-block">{{
                                errors.passwordRepeat[0]
                                }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <input autocomplete="off" v-model="data.captcha" type="text" name="captcha" id="captcha"
                            class="form-control tBoxSize02" placeholder="Enter Captcha">
                        <div v-if="errors.captcha" class="invalid-feedback d-block">{{
                            errors.captcha[0]
                        }}</div>
                    </div>
                    <div class="row mb-3">
                        <span v-html="captcha_image"></span>
                    </div>
                    <!-- Send button -->
                    <button class="btn btnSize01 secondaryBtn" type="submit">Save</button>
                </form>
            </div>
            <!--Grid row-->
        </section>
    </div>
</template>

<script>
import Error from '../../../mixins/errors'

export default {
    mixins: [Error],
    data: function () {
        return {
            data: {
                name: '',
                surname: '',
                email: '',
                role: 30,
                password: '',
                passwordRepeat: '',
                captcha: '',
            },
            loading: false,
            errors: {},
            roles: [],
            captcha_image: '',
        }
    },
    mounted() {
        axios.get('user-roles').then((response) => {
            this.roles = response.data.data
        });
        this.loadCaptcha();
    },
    computed: {
        postUrl: function () {
            return '/users';
        }
    },
    methods: {
        save: function () {
            this.loading = true;

            axios.post(this.postUrl, this.data)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.errors = {};
                    this.loading = false;
                    this.$router.push('/users');
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                    this.loading = false;
                });
            this.loadCaptcha();
        },
        loadCaptcha: function () {
            this.loading = true;
            axios.get('/reload-captcha')
                .then((response) => {
                    this.captcha_image = response.data.captcha;
                    this.loading = false;
                })
        }
    }
}
</script>
