$(function() {

    //control navbar-fold-xs overflow style
    $("body").on("click", ".toggle-navbar-fold-xs", function(e){
        const navTemplate = $(this).closest(".nav-template");
        navTemplate.find(".navbar-fold-xs").removeClass("vis");
    });

    /*-------------------------------*
    Left nav template one**begin
    *-------------------------------*/
    //notification part**begin
    $("body").on("click", ".icon-outline-notification", function(event) {
        event.stopPropagation();
        const notificationBox = $(this).closest(".notification-box");
        const navTemplate = $(this).closest(".nav-template");
        if (notificationBox.find(".notification-container").css("display") === "none") {
            notificationBox.find(".new-notification-flag").remove();
            notificationBox.find(".notification-container").css("display", "block");
            navTemplate.find(".user-profile-container").css("display", "none");
            navTemplate.find(".navbar-fold-xs").addClass("vis");
        } else {
            notificationBox.find(".notification-container").css("display", "none");
            navTemplate.find(".user-profile-container").css("display", "none");
            navTemplate.find(".navbar-fold-xs").removeClass("vis");
        }
    });

    $("body").on("click", ".notification-box .list-item", function(event) {
        event.stopPropagation();
        $(this).removeClass("un-read");
    });

    $("body").on("click", ".notification-box .delete", function(event) {
        event.stopPropagation();
        const parentListItem = $(this).closest(".list-item");
        const hr = parentListItem.next("hr");
        const notificationList = $(this).closest(".notification-list");
        const notificationContainer = $(this).closest(".notification-container");
        parentListItem.remove();
        hr.remove();
        const notif = notificationList.find(".list-item");
        if (notif.length !== 0) {
            notificationContainer.find(".badge-count").text(notif.length);
        } else if (notif.length === 0) {
            notificationContainer.find(".notification-title").html("Notification");
            notificationContainer.find(".empty-view").css("display", "flex");
            notificationContainer.find(".clear-all-btn").remove();
        }
    });

    $("body").on("click", ".notification-container .clear-all-btn", function(event) {
        event.stopPropagation();
        const notificationContainer = $(this).closest(".notification-container");
        notificationContainer.find(".list-item").remove();
        notificationContainer.find("hr").remove();
        notificationContainer.find(".notification-title").html("Notification");
        notificationContainer.find(".empty-view").css("display", "flex");
        notificationContainer.find(".notification-container .clear-all-btn").remove();
    });
    //notification part**end

    //logout part**begin
    $("body").on("click", ".logout-container>.user-name", function(event) {
        event.stopPropagation();
        const logoutContainer = $(this).closest(".logout-container");
        const currentNavigation = $(this).closest(".navigation");
        const navTemplate = $(this).closest(".nav-template");
        if (logoutContainer.find(".user-profile-container").css("display") === "none") {
            logoutContainer.find(".user-profile-container").css("display", "block");
            currentNavigation.find(".notification-container").css("display", "none");
            navTemplate.find(".navbar-fold-xs").addClass("vis");
        } else {
            currentNavigation.find(".user-profile-container").css("display", "none");
            navTemplate.find(".navbar-fold-xs").removeClass("vis");
        }
    });
    //logout part**end

    //left nav part**begin
    const bodyWidth = $('body').width();
    if(bodyWidth >= 1242){
        const navTemplate = $(".nav-template");
        navTemplate.find(".left-nav").attr("class", "left-nav closeLeftNav cl-nav no-animation");
        navTemplate.find(".item-name").css("display", "inline");
        navTemplate.find(".item-detail").each(function(){
            if($(this).hasClass('show_detail')){
                $(this).show();
            }
        });
        setTimeout(function() {
            navTemplate.find(".left-nav").removeClass('no-animation');
        }, 1000);
        iconControl(navTemplate);
    }       

    $( window ).resize(function() {
        const bodyWidth = $('body').width();
        const navTemplate = $(".nav-template");
        navTemplate.find(".navbar-fold-xs").removeClass("vis");
        if(bodyWidth >= 1242){
            navTemplate.find(".left-nav").attr("class", "left-nav openLeftNav op-nav");
            navTemplate.find(".item-name").css("display", "inline");
            navTemplate.find(".item-detail").each(function(){
                if($(this).hasClass('show_detail')){
                    $(this).show();
                }
            });
            iconControl(navTemplate);
        } else {
            navTemplate.find(".left-nav").attr("class", "left-nav closeLeftNav cl-nav");
            navTemplate.find(".item-name").css("display", "none");
            navTemplate.find(".item-opened").hide();
            navTemplate.find(".item-open").hide();
            navTemplate.find(".item-detail").hide();
        } 
    });

    $("body").on("click", ".template-theme-one .hamberger-btn", function(event) {
        event.stopPropagation();
        const navTemplate = $(this).closest(".nav-template");
        $(this).children("i").addClass("reversal-action");
        setTimeout(() => {
            navTemplate.find(".hamberger-btn").children("i").removeClass("reversal-action");
        }, 1000);
        const currentState = navTemplate.find(".left-nav").attr("class");
        if (currentState.indexOf("openLeft") !== -1) {
            navTemplate.find(".left-nav").attr("class", "left-nav closeLeftNav cl-nav");
            navTemplate.find(".item-name").css("display", "none");
            navTemplate.find(".item-opened").hide();
            navTemplate.find(".item-open").hide();
            navTemplate.find(".item-detail").hide();
        } else if (currentState.indexOf("openLeft") === -1) {
            navTemplate.find(".left-nav").attr("class", "left-nav openLeftNav op-nav");
            navTemplate.find(".item-name").css("display", "inline");
            navTemplate.find(".item-detail").each(function(){
                if($(this).hasClass('show_detail')){
                    $(this).show();
                }
            });
            iconControl(navTemplate);
        }
    });

    function iconControl(navTemplate) {
        navTemplate.find(".item").each(function() {
            if ($(this).find(".item-detail").is(":visible")) {
                $(this).find(".item-opened").show();
                $(this).find(".item-open").hide();
            } else {
                $(this).find(".item-opened").hide();
                $(this).find(".item-open").show();
            }
        });
    }

    $("body").on("click", ".template-theme-one .item-detail-item", function(event) {
        event.stopPropagation();
        const leftNav = $(this).closest(".left-nav");
        const item = $(this).closest(".item");
        const itemDetail = $(this).closest('.item-detail');
        leftNav.find(".item").removeClass("active");
        leftNav.find(".item-detail-item").removeClass("active");
        $(this).addClass("active");
        item.addClass("active");
        if(leftNav.hasClass('op-nav')){
            return;
        }else{
            itemDetail.hide();
        }
    });

    $("body").on("mouseover", ".template-theme-one .left-nav.cl-nav .item", function() {
        $(this).find(".item-detail").show();
    });

    $("body").on("mouseout", ".template-theme-one .left-nav.cl-nav .item", function() {
        $(this).find(".item-detail").hide();
    });

    $("body").on("click", ".template-theme-one .item", function() {
        const leftNav = $(this).closest(".left-nav");
        if (leftNav.hasClass("op-nav") && $(this).find(".item-detail").length > 0) {
            if ($(this).find(".item-opened").is(":visible")) {
                $(this).find(".item-opened").hide();
                $(this).find(".item-open").show();
                $(this).find(".item-detail").hide().removeClass('show_detail');
            } else {
                $(this).find(".item-opened").show();
                $(this).find(".item-open").hide();
                $(this).find(".item-detail").show().addClass('show_detail');

            }
        } else if ($(this).find(".item-detail").length === 0) {
            $(this).parent().find('.sub-item-list-item').removeClass('active');
            $(this).parent().find(".item").removeClass("active");
            $(this).addClass("active");
        } else {
            return;
        }
    });
    //left nav part**end
    /*-------------------------------*
    Left nav template one**begin
    *-------------------------------*/

    /*-------------------------------*
    Template common part**begin
    *-------------------------------*/
    //click to hide dropdown**begin
    $("body").click(() => {
        $(".popup").css("display", "none");
    });
    //click to hide dropdown**end

    initNav();
        
    //search block part**begin
    $("body").on("click", ".search-block .delete-wrapper", function() {
        $(this).closest(".search-block").find(".search-content").val("");
        $(this).addClass("display-none");
    });

    $("body").on("propertychange input", ".search-content", function() {
        if ($(this).val() === "") {
            $(this).next().filter(".delete-wrapper").addClass("display-none");
        } else {
            $(this).next().filter(".delete-wrapper").removeClass("display-none");
        }
    });
    //search block part**end
    /*-------------------------------*
    Template common part**end
    *-------------------------------*/

});

$('.dropdown-default .dropdown-menu a,.dropdown-small .dropdown-menu a').not('.disabled').on('click', event => {
    $(event.currentTarget).parents('.dropdown').find('.dropdown-toggle').html($(event.currentTarget).html());
    $(event.currentTarget).parents('.dropdown-menu').find('li').removeClass('dropdown-active');
    $(event.currentTarget).parent().addClass('dropdown-active');
});
