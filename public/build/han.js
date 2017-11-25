var han = {
    show: function (t) {
        $(t).children().css({"display":"inline-block"})
    },
    addlabelshow: function(){
        $("#w").remove();
        $("#showlabel").append("<div id='w'><div class='write'contenteditable='true'></div><div class='ok' onclick='han.addlabel(this)'>ok</div></div>");
    },
    deletelabel: function(t){
        var id = $(t).attr("labelId");
        $(t).parent().remove();
        $.ajax({
            url: "/label/del",
            data: {id: id},
            success: function (data) {
                console.log(data);
            }
        })
    },
    addlabel: function(t){
        var label = $(t).siblings().html();
        var id = new Date().getTime();
        $("#w").remove();
        if (label === null || label === undefined || label === "") return false;
        $("#showlabel").append("<div class='label' onclick='han.show(this)'>" + label + "<div onclick='han.deletelabel(this)' labelId=" + id + ">x</div></div>");
        $.ajax({
            url: "/label/add",
            data: {label: label, id: id},
            success: function (data) {
                console.log(data)
            }
        })
    }
}