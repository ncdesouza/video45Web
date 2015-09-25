

$(function() {
    var BV = new $.BigVideo();
    var vids = [
        'public/vid/river.mp4',
        'public/vid/dock.mp4',
        'public/vid/frontier.mp4'
    ];

    BV.init();
    BV.show('public/vid/dock.mp4', {ambient:true});
});