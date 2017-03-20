// Generated by CoffeeScript 1.6.3

(function () {
  !(function (window) {
    var Toolbar;
    var currUser = {
      //use to join avator
      AU: ""
    };
    var isNotifyShowed = false;
    var AUtoAvatar = function (AU) {
      _AUPath = AU.split("").join("/");
      return "http://avatar.csdn.net/" + _AUPath + "/2_" + currUser.userName + ".jpg";
    }
    var getActive = function () {
      return document.activeElement;
    }
    Toolbar = function (opts) {
      this.opts = opts;
      this.Doms = {};
      this.Curr = null;
      this.init.apply(this, [opts]);
    };
    Toolbar.prototype = {
      init: function (opts) {
        opts = opts || this.opts;
        this.getDoms(opts).bindEvent();
        this.initFavor();
        this.initNotify();
        this.initProfile();
      },

      /*
       * 鑱氬悎鎵€鏈塪om鎶撳彇
       */
      getDoms: function (opts) {
        opts = opts || this.opts;
        this.Doms.wraper = opts.wraper;
        this.folded = true;
        this.Doms.listBtns = $(opts.wraper + " ul.btns>li");
        this.Doms.profile = $(opts.wraper + " .profile");
        return this;
      },
      bindEvent: function (opts) {
        var _this = this;
        var $loginWrap = $(this.Doms.wraper + " .login-wrap");
        opts = opts || this.opts;

        this.Doms.listBtns.bind('mouseover', function (event) {
          _this.Curr = $(this).parent().children().filter(".on")[0];

          if ($(event.target).hasClass("notify") || $(event.target).parents().filter(".notify").length) {

            if (!isNotifyShowed || opts.notifyInst.isHasNewMsg()) {
              $("#header_notice_num").trigger("click");
              isNotifyShowed = true;
            }
          }
          if (_this.Curr == this) {
            return;
          }
          $(_this.Curr).removeClass("on");
          $(this).addClass("on");
          _this.folded = false;
        });
        $(this.Doms.wraper).bind('mouseleave',function(e){
            if($(getActive()).parents().filter(_this.Doms.wraper).length>0){
              return;
            }
            $(document.body).trigger("toolbar-fold");
            $(_this.Doms.wraper).find(".on").removeClass("on");// hotfix geek.csdn.net firfox can't removeclass "on"
        });

        $(document).bind("click", function (e) {
          if ($(e.target).parents().filter(_this.Doms.wraper).length <= 0) {
            $(document.body).trigger("toolbar-fold");
            $(_this.Doms.wraper).find(".on").removeClass("on");// hotfix geek.csdn.net webkit click can't removeclass "on"
          }
        });

        $(document.body).bind("toolbar-fold", function (e) {
          _this.Doms.listBtns.filter(".on").removeClass("on");
        });
        $(this.Doms.wraper + " .search form").bind("keyup", function (e) {
          if (e.keycode == 13) {
            this.submit();
          }
        });
        // $(document).bind("userLogined",function(e,userData){
        //   $loginWrap.removeClass("unlogin");
        //   userData.userName&&$loginWrap.show();
        // });

        // $(document).bind("userLoginOut",function(e,username){
        //   $loginWrap.addClass("unlogin").removeClass("hide").show();
        // });


        return this;
      },
      initLogo: function (opts) {},
      initFavor: function () {
        var _wraper = this.Doms.wraper + " .favor"
        var _title = document.title;
        var _url = document.location.href;
        var $title = $(_wraper + " .title");
        var $url = $(_wraper + " .url");
        // var $tag = $(_wraper + " .tag");
        // var $description = $(_wraper + " .description");
        var $tag = $(_wraper + " #input-tag");
        var $description = $(_wraper + " #input-description");
        var $share = $(_wraper + " .share");
        var $cancel = $(_wraper + " .cancel");
        var $submit = $(_wraper + " .submit");
        var $ok = $(_wraper + " .ok");


        //set value
        $title.val(_title);
        $url.val(_url);
        $share.attr("checked", true);

        //bind event
        $cancel.bind("click", function (e) {
          $(document.body).trigger("toolbar-fold");
          $(this).closest(".on").removeClass("on");// hotfix geek.csdn.net webkit and firfox click can't removeclass "on"
        });

        $ok.bind("click", function (e) {
          $(_wraper + " .favor-failed").hide();
          $(_wraper + " .favor-success").hide();
          $(_wraper + " .favor-form").show();
          $(document.body).trigger("toolbar-fold");
        });
        // get knowledge graph data list begin
        $.ajax({
          dataType: "jsonp",
          jsonp: "callback",
          url: "http://lib.csdn.net/public/api/getUserStructList",
          type: "GET",
          success: function (data) {
              if(data.data.length<=0){
                $("#toolbar_Design_knowledge").html("<li>选择知识图谱</li>");
              }else{
                 $.each(data.data, function (index, item) {
                    var name = data.data[index].name;
                    $("#toolbar_Design_knowledge").append("<li>" + name + "</li>");
                 });
              }
          },
          error:function(err){
            console.log(err);
          }
        });
        var lib_list = $("#toolbar_Design_knowledge");
        $(".save_lib_map").attr({checked:true});
        $(lib_list).bind("mouseup",function(ev){
          var e=window.event||ev;
          var thisli=e.target||e.srcElement;
          var thisTxt = $(thisli).text();
          $("#toolbar_sele_map").focus().html(thisTxt + ' <i class="fa fa-chevron-down"></i>');
          $(thisli).parents(".dropdown").removeClass('open');
        });
        // get knowledge graph data list end,Maintenance by Zhaofang Nie, 2017-02-21
        $submit.bind("click", function (e) {
          var nowLiiSelect = $.trim($("#toolbar_sele_map").text());
          var noText = "选择知识图谱";
          var saveNull = null;
          var ifchecked = $(".save_lib_map").is(":checked");
          if(ifchecked&&(nowLiiSelect!==noText)){
            var lastLIselect = nowLiiSelect;
          }else{
            var lastLIselect = saveNull;
          }
          var _data = {
            title: $title.val(),
            //url:encodeURIComponent($url.val()),
            url: $url.val(),
            description: $description.val(),
            tag: $tag.val(),
            share: $share[0].checked ? 1 : 0,
            map_name:lastLIselect //knowledge map
          };
            function resetForm() {
              $(_wraper + " .title").val($title.val());
              $(_wraper + " .url").val(window.location.href);
              $(_wraper + " .tag").val("");
              $(_wraper + " .description").val("");
            }

            function cbSuccess() {
              $(_wraper + " .favor-failed").show();
              $(_wraper + " .favor-success").hide();
              $(_wraper + " .favor-form").hide();
            }

            function cbError() {
              $(_wraper + " .favor-failed").hide();
              $(_wraper + " .favor-success").show();
              $(_wraper + " .favor-form").hide();
            }

          $.ajax({
            data: _data,
            jsonp: "jsonpcallback",
            dataType: "jsonp",
            url: "http://my.csdn.net/service/favorite/add_favorite",
            success: function (data) {
              if (data.success == "-1") {
                cbSuccess();
                resetForm();
              }
              if (data.success == "1") {
                cbError();
                resetForm();
              }
            }
          });

          return false;
        });

      },
      initNotify: function (opts) {
        var _this = this;
        var opts = opts || this.opts;
        if (!opts.notifyInst) {
          $(opts.wraper + " .notify").hide();
          throw "notify.js not loaded!";
        }
        $(document).bind("toolbar-setNotesNum", function (e, num) {
          var $number = $(_this.Doms.wraper + " .number");
          var $hasnotes = $(_this.Doms.wraper + " .icon-hasnotes-sm");
          if (num <= 0) {
            $hasnotes.hide();
            return;
          } else if (num > 0) {
            $hasnotes.show();
          }
        });
        if (opts.notifyInst) {
          opts.notifyInst.on("receive_unreads", function (e, data) {
            var num = opts.notifyInst.getlocalUnread().length;
            $(document).trigger("toolbar-setNotesNum", num);
          });
          opts.notifyInst.on("receive_setreaded", function (e, data) {
            var num = opts.notifyInst.getlocalUnread().length;
            $(document).trigger("toolbar-setNotesNum", num);
          });
        }
      },
      initProfile: function (userData) {
        var _this = this;
      }
    };
    return window["Toolbar"] = Toolbar;
  })(window);

  var $oScriptTag = $("#csdn-toolbar-id");
  var inst = typeof csdn_note == 'undefined' ? null : csdn_note;
  new Toolbar({
    wraper: ".csdn-toolbar",
    notifyInst: inst
  });
}).call(this);