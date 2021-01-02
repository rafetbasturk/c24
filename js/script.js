$(function() {
    let allItems = [];
    let activeItems = [];
    let completedItems = [];
    let id;

    // load theme from local storage

    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        $("html").addClass("dark");
        $("header img").attr({
            src: "./images/icon-sun.svg",
            alt: "sun"
        });
    }

    // load items from localstorage

    let allData = localStorage.getItem("all");

    if (allData) {
        allItems = JSON.parse(allData);
        loadItems(allItems);
        id = allItems.length;
    } else {
        allItems = [
            {
                task: "Complete online JavaScript course",
                id: 0,
                completed: true
            },
            {
                task: "Jog around the park 3x",
                id: 1,
                completed: false
            },
            {
                task: "10 minutes meditation",
                id: 2,
                completed: false
            },
            {
                task: "Read for one hour",
                id: 3,
                completed: false
            },
            {
                task: "Pick up groceries",
                id: 4,
                completed: false
            },
            {
                task: "Complete Todo App on Frontend Mentor",
                id: 5,
                completed: false
            }
        ];
        id = 6;
    };

    function loadItems(array) {
        array.forEach(el => el);
    };

    if (allItems.length === 0) {
        $("#allList, #activeList, #completedList").text("There is no item.").css({
            "width": "100%",
            "padding": "0 2rem",
            "height": "300px",
            "padding-top": "125px",
            "text-align": "center",
            "color": "var(--l-grayish-blue)"
        });
    };

    $.each(allItems, function(i, x){
        let check = "";
        let line = "";

        if (x.completed) {
            check = "check";
            line = "line";
        }
        
        $.each(this, function (key, value) {            
            if (key === "task") {
                $("#allList").append(
                    `<li>
                        <span class="circle ${check}"></span>
                        <p class="completed ${line}">${value}</p>
                        <img class="cross" src="./images/icon-cross.svg" alt="cross">
                    </li>`
                );
            };
        });
    });

    // count items function

    function countItems(x) {
        if (x <= 1) {
            $("#left").text(`${x} item left`);
        } else {
            $("#left").text(`${x} items left`);
        };
    };

    const count = allItems.filter(x => x.completed == false).length;
    countItems(count);

    // add new item function

    function addNewItem(item) {
        $("#allList").append(
            `<li>
                <span class="circle"></span>
                <p class="completed">${item}</p>
                <img class="cross" src="./images/icon-cross.svg" alt="cross">
            </li>`
        );
    };

    // add new item with keydown

    $("body").on("keydown", "input", function(e){        
        if (e.key == "Enter" && $(this).val() != ""){
            addNewItem($(this).val(), id, false);
            allItems.push(
                {
                task: $(this).val(),
                id: id,
                completed: false
                }
            );
            id++;
            $(this).val("");

            localStorage.setItem("all", JSON.stringify(allItems));
            location.reload();
        };

        const count = allItems.filter(x => x.completed == false).length;
        countItems(count);
    });

    // complete item

    $("body").on("click", ".circle", function(e) {
        let todoText = $(e.currentTarget).parent().children("p").text();

        $.grep(allItems, function (x) {
            if (x.task == todoText) {
                if (x.completed == false) {
                    x.completed = true;
                } else {
                    x.completed = false;
                }
            };
        });

        $(e.currentTarget).toggleClass("check");
        $(e.currentTarget).next().toggleClass("line");

        localStorage.setItem("all", JSON.stringify(allItems));
        location.reload();

        const count = allItems.filter(x => x.completed == false).length;
        countItems(count);
    });

    $("body").on("click", ".completed", function(e) {
        let todoText = $(e.currentTarget).text();

        $.grep(allItems, function (x) {
            if (x.task == todoText) {
                if (x.completed == false) {
                    x.completed = true;
                } else {
                    x.completed = false;
                }
            };
        });

        $(e.currentTarget).prev().toggleClass("check");
        $(e.currentTarget).toggleClass("line");

        localStorage.setItem("all", JSON.stringify(allItems));
        location.reload();

        const count = allItems.filter(x => x.completed == false).length;
        countItems(count);
    });

    // delete item

    $("body").on("click", ".cross", function(e) {
        let todoText = $(e.currentTarget).parent().children("p").text();
        
        allItems = $.grep(allItems, function (x) {
            return x.task != todoText;
        });

        const count = allItems.filter(x => x.completed == false).length;
        countItems(count);

        localStorage.setItem("all", JSON.stringify(allItems));
        location.reload();
    });

    // "all" tab

    $("body").on("click", "#allListBtn", function () {
        $(this).addClass("blue");
        $("#activeListBtn").removeClass("blue");
        $("#completedListBtn").removeClass("blue");

        $("#allList").slideDown();
        $("#completedList").css("display", "none");
        $("#activeList").css("display", "none");

        const count = allItems.filter(x => x.completed == false).length;
        countItems(count);
    });

    // "active" tab

    activeItems = $.grep(allItems, function (x) {
        return x.completed == false;
    });

    $.each(activeItems, function(i, x){
        $.each(this, function (key, value) {            
            if (key === "task") {
                $("#activeList").append(
                    `<li>
                        <span class="circle"></span>
                        <p>${value}</p>
                        <img class="cross" src="./images/icon-cross.svg" alt="cross">
                    </li>`
                );
            };
        });
    });

    $("#activeList").css("display", "none");

    $("body").on("click", "#activeListBtn", function() {
        $(this).addClass("blue");
        $("#allListBtn").removeClass("blue");
        $("#completedListBtn").removeClass("blue");
        
        $("#allList").css("display", "none");
        $("#completedList").css("display", "none");
        $("#activeList").slideDown();

        const count = activeItems.filter(x => x.completed == false).length;
        countItems(count);
    });

    // "completed" tab

    completedItems = $.grep(allItems, function (x) {
        return x.completed == true;
    });

    $.each(completedItems, function(i, x){
        $.each(this, function (key, value) {            
            if (key === "task") {
                $("#completedList").append(
                    `<li>
                        <span class="circle check"></span>
                        <p class="line">${value}</p>
                        <img class="cross" src="./images/icon-cross.svg" alt="cross">
                    </li>`
                );
            };
        });
    });

    $("#completedList").css("display", "none");

    $("body").on("click", "#completedListBtn", function() {
        $(this).addClass("blue");
        $("#allListBtn").removeClass("blue");
        $("#activeListBtn").removeClass("blue");
        
        $("#allList").css("display", "none");
        $("#completedList").slideDown();
        $("#activeList").css("display", "none");

        const count = allItems.filter(x => x.completed == true).length
        if (count <= 1) {
            $("#left").text(`${count} item completed`);
        } else {
            $("#left").text(`${count} items completed`);
        };
    });

    // clear completed

    $("body").on("click", "#clear", function() {
        if (completedItems.length === 0) {
            alert("There is no completed item to erase.")
        } else if (confirm("Are you sure you want to clear completed items?")) {
            allItems = $.grep(allItems, function (x) {
                return x.completed != true;
            });
        };

        const count = allItems.filter(x => x.completed == false).length;
        countItems(count);

        localStorage.setItem("all", JSON.stringify(allItems));
        location.reload();
    });

    // dark and light mode toggle

    $("body").on("click", "header img", function toggleTheme() {
        
        $("html").toggleClass("dark");

        let mode = $("html").hasClass("dark");

        if (mode) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

        const src = $("header img").attr("src");
        
        if (src === "./images/icon-moon.svg") {
            $("header img").attr({
                src: "./images/icon-sun.svg",
                alt: "sun"
            });
        } else {
            $("header img").attr({
                src: "./images/icon-moon.svg",
                alt: "moon"
            });
        }
    });

    $("#allList, #activeList, #completedList").sortable();
});