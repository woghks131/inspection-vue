import axios from 'axios';

const API_BASE_URL = 'http://localhost:8280/';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터 (Authorization 헤더 자동 추가)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 (401 처리)
api.interceptors.response.use(
    (response) => response,
    (error) => {

    console.error("에러코드 : ", error.response?.status);

        if (error.response?.status === 401) {

            
            


           // window.location.href = '/'; // 로그인 페이지로 이동
        }
        return Promise.reject(error);
    }
);

export default api;
