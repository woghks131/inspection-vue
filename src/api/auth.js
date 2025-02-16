import api from './api';
import { ref } from 'vue';

export function useAuth() {
    const token = ref(localStorage.getItem('token') || '');

    const login = async (userId, password) => {
        try {
            const res = await api.post('/auth/login', { userId, password });
            token.value = res.data.token;
            localStorage.setItem('token', token.value);
        } catch (err) {
            alert(err.response?.data?.message || '로그인 실패');
            throw new Error(err.response?.data?.message || '로그인 실패');
        }
    };

    const logout = () => {
        token.value = '';
        localStorage.removeItem('token');
        window.location.href = '/login'; // 로그인 페이지로 이동
    };

    return {login, logout };
}
