$(function() {
    let allItems = [];
    let activeItems = [];
    let completedItems = [];
    let id;
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

    const count = allItems.filter(x => x.completed == false).length;
    if (count <= 1) {
        $("#left").text(`${count} item left`);
    } else {
        $("#left").text(`${count} items left`);
    };

    function addNewItem(item) {
        $("#allList").append(
            `<li>
                <span class="circle"></span>
                <p class="completed">${item}</p>
                <img class="cross" src="./images/icon-cross.svg" alt="cross">
            </li>`
        );
    };

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
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };
    });

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
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };
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
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };
    });

    $("body").on("click", ".cross", function(e) {
        let todoText = $(e.currentTarget).parent().children("p").text();
        
        allItems = $.grep(allItems, function (x) {
            return x.task != todoText;
        });

        const count = allItems.filter(x => x.completed == false).length;
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };

        localStorage.setItem("all", JSON.stringify(allItems));
        location.reload();
    });

    $("body").on("click", "#clear", function() {
        allItems = $.grep(allItems, function (x) {
            return x.completed != true;
        });

        $(".check").next().toggleClass("line");
        $(".check").toggleClass("check");

        const count = allItems.filter(x => x.completed == false).length;
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };
        

        localStorage.setItem("all", JSON.stringify(allItems));
        location.reload();
    });

    $("body").on("click", "#allListBtn", function () {
        $(this).addClass("active");
        $("#activeListBtn").removeClass("active");
        $("#completedListBtn").removeClass("active");

        $("#allList").slideDown();
        $("#completedList").css("display", "none");
        $("#activeList").css("display", "none");

        const count = allItems.filter(x => x.completed == false).length;
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };
    })

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
        $(this).addClass("active");
        $("#allListBtn").removeClass("active");
        $("#completedListBtn").removeClass("active");
        
        $("#allList").css("display", "none");
        $("#completedList").css("display", "none");
        $("#activeList").slideDown();

        const count = activeItems.filter(x => x.completed == false).length;
        if (count <= 1) {
            $("#left").text(`${count} item left`);
        } else {
            $("#left").text(`${count} items left`);
        };
    });

    completedItems = $.grep(allItems, function (x) {
        return x.completed == true;
    });

    $.each(completedItems, function(i, x){
        $.each(this, function (key, value) {            
            if (key === "task") {
                $("#completedList").append(
                    `<li>
                        <span class="circle"></span>
                        <p>${value}</p>
                        <img class="cross" src="./images/icon-cross.svg" alt="cross">
                    </li>`
                );
            };
        });
    });

    $("#completedList").css("display", "none");

    $("body").on("click", "#completedListBtn", function() {
        $(this).addClass("active");
        $("#allListBtn").removeClass("active");
        $("#activeListBtn").removeClass("active");
        
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

    $("#allList").sortable();
    $("#activeList").sortable();
    $("#completedList").sortable();

    $("body").on("click", "header img", function toggleTheme() {
        
        $("html").toggleClass("dark");

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
});