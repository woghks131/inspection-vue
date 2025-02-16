<template>
    <div class="login-bg d-flex align-items-start">
        <div style="margin-top: 10rem !important;">
            <p class="fs-1 fw-bold text-light">CAR FRIEND</p>
            <b-form-input id="input-2" class="mt-5" placeholder="아이디" required v-model="userId"></b-form-input>
            <b-form-input type="password" id="text-password" class="mt-3" aria-describedby="password-help-block" placeholder="비밀번호" v-model="password"></b-form-input>

            <b-button variant="outline-primary  mt-3" @click="goLogin">로그인</b-button>

        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuth } from '../api/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = ref('');
const password = ref('');

const { login } = useAuth();

const goLogin = async () => {
    try {
        await login(userId.value, password.value);
        router.push('/main');
    } catch (err) {
        console.error(err);
    }
};


</script>

<style>
.login-bg {
    background: url('../images/login_bg.jpg') no-repeat center center;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>