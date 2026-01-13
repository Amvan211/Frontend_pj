const enter = document.getElementById('enter');
const dateInput = document.getElementById('dt_start');
const time = document.getElementById('time');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

function addTask() {
    const text = enter.value.trim();
    const startDate = dateInput.value;
    const startDay = new Date(dateInput.value);
    const long_time = parseInt(time.value);

    if (text === '' || startDate === '' || isNaN(long_time)) {
        alert("Hãy điền đầy đủ thông tin công việc nhé!");
        return;
    }

    const startD = startDay.getTime();
    const endD = startD + long_time * 60000;
    let isDuplicate = false;
    const items = document.querySelectorAll('.task-item');

    items.forEach(item => {
        const oldStart = new Date(item.dataset.start).getTime();
        const oldTime = parseInt(item.dataset.long_time);
        const oldEnd = oldStart + oldTime * 60000;

        if (startD < oldEnd && endD > oldStart) {
            isDuplicate = true;
        }
    });

    if (isDuplicate) {
        alert("Thời gian này đang có việc khác rồi!");
        return;
    }

    const li = document.createElement('li');
    li.className = 'task-item pending';
    
    li.dataset.start = startDate;
    li.dataset.long_time = long_time; 
    
    li.innerHTML = `
        <div class="task-info">
            <input type="checkbox" class="check-task">
            <span>
                <strong>${text}</strong> <br>
                <small>📅: ${startDate.replace('T', ' ')}</small> <br>
                <small>⏳: ${long_time} phút</small>
            </span>
        </div>
        <button class="delete-btn">Xóa</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => li.remove());

    li.querySelector('.check-task').addEventListener('change', (e) => {
        if (e.target.checked) {
            li.classList.add('completed');
            li.classList.remove('pending');
        } else {
            li.classList.add('pending');
            li.classList.remove('completed');
        }
    });

    taskList.appendChild(li);
    
    enter.value = '';
    dateInput.value = '';
    time.value = '';
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) activeBtn.classList.remove('active');
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const items = taskList.querySelectorAll('.task-item');

        items.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'flex';
            } else if (item.classList.contains(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

addBtn.addEventListener('click', addTask);