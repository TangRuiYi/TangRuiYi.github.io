var ppt = {
    $wrapper: $('.wrapper'),
    len: $('.slider').length,
    activeIndex: 0,
    lastIndex: undefined,
    $slider: $('.slider'),
    flag:true,
    timer:null,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.slider_auto();
        }
    },
    createDom: function (len) {
        var str = '',
            btnStr = '';
        for (var i = 0; i < len; i++) {

            if (i == 0) {
                str += '<li class = "active">' + (i + 1) + '</li>'
            } else {
                str += '<li>' + (i + 1) + '</li>';
            }

        }
        str = '<div class="slider-order"><ul>' + str + '</ul></div>';

        btnStr = '<div class="slider-btn">\
                    <span class = "left-btn"></span>\
                    <span class = "right-btn"></span>\
                </div>';
        this.$wrapper.append(btnStr).append(str);

    },
    bindEvent: function () {
        var _this = this;
        $('li').add($('.left-btn')).add($('.right-btn')).on('click', function () {
            console.log('hello world');
            if ($(this).attr('class') == "left-btn") {
                _this.tool('left');
            } else if ($(this).attr('class') == 'right-btn') {
                _this.tool('right');
            } else {
                var index = $(this).index();
                _this.tool(index);
            }

        })
        this.$slider.on('leave', function () {
            $(this).fadeOut(300);
        })
        this.$slider.on('come', function () {
            $(this).fadeIn(300,function(){
                _this.flag = true;
            });

        })
    },
    tool:function(direction){
        
        if(this.flag){
            console.log('tool');
            this.flag  = false;
            this.getIndex(direction);
            this.changeActive(this.activeIndex);
            this.$slider.eq(this.lastIndex).trigger('leave');
            this.$slider.eq(this.activeIndex).delay(300).trigger('come');
            this.slider_auto();
        }
       
    },
    getIndex: function (direction) {
        this.lastIndex = this.activeIndex;
        if (direction == 'left' || direction == 'right') {
            if (direction == 'left') {
                this.activeIndex = this.activeIndex == 0 ? this.len - 1 : this.activeIndex - 1;
            } else if (direction == 'right') {
                this.activeIndex = this.activeIndex == this.len - 1 ? 0 : this.activeIndex + 1;
            }
        } else {
            this.activeIndex = direction;
        }
        console.log(this.activeIndex);
    },
    changeActive: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');

    },
    slider_auto: function(){
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            _this.tool('right');
        },3000);
    }
}
ppt.init();






