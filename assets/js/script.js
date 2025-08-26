(() => {

    /* =======================
        일정 추가
       ======================= */

    const inputSchedule = document.getElementById('input-schedule');
    const inputDate = document.getElementById('input-date');

    // 추가 버튼을 클릭하여 일정 추가
    document.getElementById('btn-add').addEventListener('click', () => {
        addSchedule(inputSchedule.value, inputDate.value);
    });

    // 값을 입력받아 일정을 추가
    function addSchedule(schedule, date) {
        if (!validateInput(schedule, date)) return;

        const toDoList = document.getElementById('to-do-list');

        const toDoItem = makeScheduleItem(schedule, date);
        const dateAdded = new Date();
        const dateTime = new Date(date);
        setDate(toDoItem, dateAdded, dateTime);
        
        toDoList.appendChild(toDoItem);

        clearInput();
    }

    // 입력받은 값 유효성 검사
    function validateInput(schedule, date) {
        if (!schedule || schedule.length <= 0) {
            alert('추가할 일정을 입력해주세요.');
            return false;
        }
        if (schedule.length > 30) {
            alert('일정은 30글자 이하이어야 합니다.');
            return false;
        }
        if (!date) {
            alert('추가할 일정의 날짜를 입력해주세요.');
            return false;
        }
        if (new Date(date) < new Date()) {
            alert('이미 지나간 시간으로는 날짜를 지정할 수 없습니다.');
            return false;
        }
        return true;
    }

    // 일정 요소 생성
    function makeScheduleItem(schedule, date) {
        const toDoItem = document.createElement('li');
        toDoItem.classList.add('to-do-item');

        const toDoText = document.createElement('div');
        toDoText.classList.add('to-do-text');
        const span = document.createElement('span');
        span.innerText = schedule;
        toDoText.appendChild(span);
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn-remove');
        btnRemove.innerText = '삭제';
        toDoText.appendChild(btnRemove);

        const todoDate = document.createElement('div');
        todoDate.classList.add('to-do-date');
        todoDate.innerText = date.replace('T', ' ');

        toDoItem.appendChild(toDoText);
        toDoItem.appendChild(todoDate);
        return toDoItem;
    }

    // 일정 요소의 dateset에 추가한 시각, 일정 시각을 지정
    function setDate(toDoItem, dateAdded, dateTime) {
        toDoItem.setAttribute('data-date-added', dateAdded.getTime());
        toDoItem.setAttribute('data-date-time', dateTime.getTime());
    }

    // 입력값 초기화
    function clearInput() {
        inputSchedule.value = '';
        inputDate.value = '';
    }

    /* =======================
        일정 정렬(추가순/날짜순)
       ======================= */

    // 정렬 비교 유형
    const COMPARE_TYPE = {
        // 이름순
        SCHEDULE: "schedule",
        // 추가순
        DATE_ADDED: "date_added",
        // 날짜순
        DATE_TIME: "date_time"
    };

    // 정렬할 일정
    const toDoList = document.getElementById('to-do-list');

    // 정렬 버튼
    const btnSortSchedule = document.getElementById('btn-sort-schedule');
    const btnSortAdd = document.getElementById('btn-sort-add');
    const btnSortTime = document.getElementById('btn-sort-time');

    // 버튼 클릭 리스너 등록
    btnSortSchedule.addEventListener('click', () => { sort(COMPARE_TYPE.SCHEDULE); });
    btnSortAdd.addEventListener('click', () => { sort(COMPARE_TYPE.DATE_ADDED); });
    btnSortTime.addEventListener('click', () => { sort(COMPARE_TYPE.DATE_TIME); });

    // 정렬
    function sort(compareType) {
        const comparator = getComparator(compareType);
        const array = Array.from(toDoList.children);
        array.sort(comparator).forEach(item => {
            toDoList.appendChild(item);
        });
    }

    // 요소 비교를 반환하는 함수
    function getComparator(compareType) {
        switch (compareType) {
            // 이름순 정렬
            case COMPARE_TYPE.SCHEDULE: {
                return (function (a, b) {
                    const aText = a.querySelector('.to-do-text > span').innerText;
                    const bText = b.querySelector('.to-do-text > span').innerText;
                    return aText < bText ? -1 : aText > bText ? 1 : 0;
                });
            }
            // 추가순 정렬
            case COMPARE_TYPE.DATE_ADDED: {
                return (function (a, b) {
                    return a.getAttribute('data-date-added') - b.getAttribute('data-date-added');
                });
            }
            // 날짜순 정렬
            case COMPARE_TYPE.DATE_TIME: {
                return (function (a, b) {
                    return a.getAttribute('data-date-time') - b.getAttribute('data-date-time');
                });
            }
        }
    }

    /* =======================
        일정 삭제
       ======================= */

    document.getElementById('to-do-list').addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove')) {
            e.target.parentElement.parentElement.remove();
        }
    });
})();