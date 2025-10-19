const dd = console.log;

const Quiz = {
    json: [],
    data: [],
    checks: [],

    async init() {
        Quiz.json = await $.get(`/api/data.json?d=${new Date().getTime()}`);

        Quiz.hook();
        Quiz.setData();
    },

    hook() {
        $(document)
            .on("click", ".quiz_btn", Quiz.start)
            .on("click", ".btn", Quiz.submit)
    },

    submit(e) {
        const idx = $(e.target).parents(".item").data("idx");
        const data = Quiz.data.find(v => v.idx == idx);
        const text = $(`#quiz-${idx}`).val();

        if (!data?.include && data.slove === text) {
            $(`.btn_box-${idx}`).html(`<div class="btn">정답!</div>`);
        } else {
            if (data?.include) {
                if (data.slove.split(",").every(v => text.includes(v))) $(`.btn_box-${idx}`).html(`<div class="btn">정답!</div>`);
                return;
            }

            $(`.btn_box-${idx}`).html(`
                <div class="btn">오답..</div>
                <div class="correct">정답: ${data?.include ? "행성의 공전 주기의 제곱은 타원 궤도 긴반지름의 세제곱에 비례한다." : data.slove}</div>
            `);
        }
    },

    start() {
        $(`.middle`).html(Quiz.data.map((v, i) => {
            return `
                <div class="item item-${v.idx}" data-idx="${v.idx}">
                    <h2 class="title">${(i + 1 + "").padStart(2, "0")}. ${v.correct}</h2>

                    <input type="text" id="quiz-${v.idx}" placeholder="답을 입력해주세요.">

                    <div class="btn_box btn_box-${v.idx}">
                        <div class="btn">제출</div>
                    </div>
                </div>
            `;
        }));
    },

    setData() {
        const mixs = Quiz.json.toSorted(() => Math.random() - .5);
        Quiz.data = mixs;
    }
}


$(() => Quiz.init());












