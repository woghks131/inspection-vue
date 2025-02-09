<template>
    <b-card class="p-2" bg-variant="secondary">
        <b-form @submit.prevent="search">
            <b-row align-v="center" align-h="end">
                <!-- 차량번호 -->
                <b-col md="3">
                <b-form-group label="차량번호" label-for="searchQuery" label-cols="3" label-class="text-white font-weight-bold">
                    <b-form-input id="searchQuery" v-model="filters.query" placeholder="차량번호" />
                </b-form-group>
                </b-col>

                <b-col md="3" class="d-flex justify-content-start" style="max-width: 353px;">
                    <b-form-radio-group class="mb-3" id="radio-group-1" v-model="selected" :options="options"  name="radio-options" style="color: white;" />
                </b-col>

                <!-- 등록일자 -->
                <b-col md="3">
                <b-form-group label="등록일자" label-for="createAt" label-cols="3" label-class="text-white font-weight-bold">
                    <VueDatePicker v-model="date" locale="ko" :enable-time-picker="false" :format="formatDate"></VueDatePicker>
                </b-form-group>
                </b-col>

                <b-col md="3" class="d-flex justify-content-end">
                    <p class="fs-5 fw-bold text-black">카프랜드 박재환</p>
                </b-col> 
        
            </b-row>

            <b-row align-v="center" align-h="end">
                <!-- 전화번호 -->
                <b-col md="3">
                <b-form-group label="전화번호" label-for="searchQuery" label-cols="3" label-class="text-white font-weight-bold">
                    <b-form-input id="searchQuery" v-model="filters.query" placeholder="전화번호" />
                </b-form-group>
                </b-col>

                <b-col md="3" class="d-flex justify-content-start" style="max-width: 353px;">
                    <b-form-radio-group class="mb-3" id="radio-group-2" v-model="selected2" :options="options2"  name="radio-options2" style="color: white;"/>
                </b-col>

                <!-- 예약일 -->
                <b-col md="3">
                <b-form-group label="예약일" label-for="createAt" label-cols="3" label-class="text-white font-weight-bold">
                    <VueDatePicker v-model="date" locale="ko" :enable-time-picker="false" :format="formatDate"></VueDatePicker>
                </b-form-group>
                </b-col>

                <!-- 검색 -->
                <b-col md="1">
                <b-button variant="outline-dark mb-3" style="width: 7.0em;" >검색</b-button>
                </b-col>

                <!-- 검색 -->
                <b-col md="2" class="d-flex justify-content-end">
                <b-button variant="outline-danger mb-3">로그아웃</b-button>
                </b-col>
                
            </b-row>
        </b-form>
    </b-card>

    <div class="mt-3 d-flex align-items-center justify-content-center" >
        <p class="me-3 mb-1" style="display: inline;">[ 총 개수 : 3 개 l 총 남은 차량 : 1 개 l 총 완료 : 1 개 ] [ 검사 대기 : 0 개 l 예약중 : 0 개 l 검사중 : 1 l 검사완료 : 1 개 l 검사 제외 : 1 개 ]</p>
        <b-form-input id="searchQuery" v-model="filters.query" placeholder="제휴공업사명" style="max-width: 140px;" />
        <b-button variant="outline-dark ms-2" style="width: 5.0em;" >배정</b-button>
    </div>


    <div class="mt-3 overflow-auto">
        <b-table
          id="main-table"
          :items="items"
          :fields="fields"
          :select-mode="selectMode"
          responsive="sm"
          ref="selectableTable"
          selectable
          @row-selected="onRowSelected"
          class="main-table"
          :per-page="perPage"
          :current-page="currentPage"
        >


        <template #cell(순번)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(선택) = "data">
          <b-button size="sm" variant="outline-dark" @click="modifyPopup(data.item)">수정</b-button>
        </template>
        <template #cell(입금일)>
          <b-button size="sm" variant="outline-primary" >송금</b-button>
          <p class="my-1" >2022-10-20</p>
        </template>
        <template #cell(상담내역)>
          <b-button size="sm" variant="outline-primary" >내역</b-button>
          <p class="my-1" >1건</p>
        </template>
        <template #cell(검사상태)>
          <b-button size="sm" variant="outline-primary" >변경</b-button>
          <p class="my-1" >고객방문</p>
        </template>
      </b-table>

      <b-modal ref="modify-mdoal" v-model="showModal" title="수정" hide-footer> 
        <div v-if="selectedItem">
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>차량번호:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.차량번호" placeholder="차량번호"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>구분:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.구분" placeholder="구분"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>차량명:</strong></p>
            </b-col>
            <b-col md="9" class="pt-2">
              <p>{{ selectedItem.차량명 }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>검사일:</strong></p>
            </b-col>
            <b-col md="9" class="pt-2">
              <p>{{ selectedItem.검사시작일 }} ~ {{ selectedItem.검사종료일 }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>업체명:</strong></p>
            </b-col>
            <b-col md="9" class="pt-2">
              <p>{{ selectedItem.업체명 }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>거래처명:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.거래처명" placeholder="거래처명"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>주소:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.주소" placeholder="주소"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>이용자:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.이용자" placeholder="이용자"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>전화번호:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.전화번호" placeholder="전화번호"/>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>예약공업사:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.예약공업사" placeholder="예약공업사"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>검사예약일:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.검사예약일" placeholder="검사예약일"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>검사완료일:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.검사완료일" placeholder="검사완료일"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3" class="pt-2">
              <p><strong>주행거리:</strong></p>
            </b-col>
            <b-col md="9">
              <b-form-input id="searchQuery" v-model="selectedItem.주행거리" placeholder="주행거리"/>
            </b-col>
          </b-row>
        </div>

        <div class="d-flex justify-content-end">
          <b-button class="mt-3" variant="outline-success" @click="modify">수정</b-button>
        </div>
      </b-modal>

      <div class="d-flex justify-content-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="main-table">
        </b-pagination>
      </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';

const date = ref(new Date());

const formatDate = (date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
};
</script>
<script>
export default {
  data() {
    return {
      filters: {
        query: "",
        selected: '',
        selected2: '',
        date: null,
      },
      options: [
          { text: '검사대기', value: '1'},
          { text: '검사완료', value: '2'},
          { text: '검사제외', value: '3'},
        ],
        options2: [
          { text: '고객방문', value: '1'},
          { text: '자사대행', value: '2'},
          { text: '공업사대행', value: '3'},
        ],
        fields: ['순번', '선택', '차량번호', '구분', '차량명', '검사시작일', '검사종료일', '업체명', '거래처명', '주소', '이용자', '전화번호', '예약공업사', '검사예약일', '검사완료일', '주행거리', '검사금액', '입금일', '상담내역', '검사상태', { key: "etc", label: "비고"}],
        items: [
          {  차량번호: '99하1111', 구분: '종합(NOX)', 차량명: '테슬라모델3', 검사시작일: '2020-01-01', 검사종료일: '2025-01-01', 업체명: '카123', 거래처명: '테스트', 주소: '서울시 금천구 가산디지털1로 30', 이용자: '테스트', 전화번호: '010-1111-2222', 예약공업사: '(주)영남 중공업', 검사예약일: '2021-10-07', 검사완료일: '2021-12-01', 주행거리: '0km', 검사금액: '35,000', etc: ''},
          {  차량번호: '99하2222', 구분: '종합(NOX)', 차량명: '테슬라모델3', 검사시작일: '2020-01-01', 검사종료일: '2025-01-01', 업체명: '카123', 거래처명: '테스트', 주소: '서울시 금천구 가산디지털1로 30', 이용자: '테스트', 전화번호: '010-1111-2222', 예약공업사: '(주)영남 중공업', 검사예약일: '2021-10-07', 검사완료일: '2021-12-01', 주행거리: '0km', 검사금액: '35,000', etc: ''},
          {  차량번호: '99하3333', 구분: '종합(NOX)', 차량명: '테슬라모델3', 검사시작일: '2020-01-01', 검사종료일: '2025-01-01', 업체명: '카123', 거래처명: '테스트', 주소: '서울시 금천구 가산디지털1로 30', 이용자: '테스트', 전화번호: '010-1111-2222', 예약공업사: '(주)영남 중공업', 검사예약일: '2021-10-07', 검사완료일: '2021-12-01', 주행거리: '0km', 검사금액: '35,000', etc: ''},
          {  차량번호: '99하4444', 구분: '종합(NOX)', 차량명: '테슬라모델3', 검사시작일: '2020-01-01', 검사종료일: '2025-01-01', 업체명: '카123', 거래처명: '테스트', 주소: '서울시 금천구 가산디지털1로 30', 이용자: '테스트', 전화번호: '010-1111-2222', 예약공업사: '(주)영남 중공업', 검사예약일: '2021-10-07', 검사완료일: '2021-12-01', 주행거리: '0km', 검사금액: '35,000', etc: ''},
          {  차량번호: '99하5555', 구분: '종합(NOX)', 차량명: '테슬라모델3', 검사시작일: '2020-01-01', 검사종료일: '2025-01-01', 업체명: '카123', 거래처명: '테스트', 주소: '서울시 금천구 가산디지털1로 30', 이용자: '테스트', 전화번호: '010-1111-2222', 예약공업사: '(주)영남 중공업', 검사예약일: '2021-10-07', 검사완료일: '2021-12-01', 주행거리: '0km', 검사금액: '35,000', etc: ''},
          
          {  차량번호: '99하5555', 구분: '종합(NOX)', 차량명: '테슬라모델3', 검사시작일: '2020-01-01', 검사종료일: '2025-01-01', 업체명: '카123', 거래처명: '테스트', 주소: '서울시 금천구 가산디지털1로 30', 이용자: '테스트', 전화번호: '010-1111-2222', 예약공업사: '(주)영남 중공업', 검사예약일: '2021-10-07', 검사완료일: '2021-12-01', 주행거리: '0km', 검사금액: '35,000', etc: ''},
        ],
        selectMode: 'multi',
        selected: [],
        perPage: 5,
        currentPage: 1,
        selectedItem: null,
        showModal: false,
    };
  },
  methods: {
    search() {
      console.log("검색 조건:", this.filters);
    },
    onRowSelected(items) {
        this.selected = items
      },
    modifyPopup(item) {
      this.selectedItem = item;
      this.showModal = true;
    },
    modify() {
      this.showModal = false;
    }
    
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  
};
</script>
<style scoped>
b-card {
  max-width: 800px;
  margin: auto;
}
</style>
<style>

.main-table {
  font-size: 14px; /* 전체 텍스트 크기 조절 */
}

/* 헤더 색상 */
.main-table thead th {
  background-color: #797875; /* 노란색 */
  color: rgb(255, 255, 255);
}

.main-table td {
  vertical-align: middle !important;
}
</style>