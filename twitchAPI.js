$(document).ready(function(){ 
        
})

let memberURL = []
let memberArr = ['freecodecamp', 'lassiz', 'test_channel', '2GD', 'Impaktpt', 'RobotCaleb', 'noobs2ninjas', 'DotaMajor']

for (let i = 0; i <memberArr.length; i++) {
    memberURL[i] = 'https://api.twitch.tv/kraken/streams/' + memberArr[i] + '?callback=?'
}

for (let i = 0; i < memberArr.length; i++ ) {
    let member = memberArr[i]
    let dataArr = []
    $.getJSON(memberURL[i], function(data) {
        console.log(data); 
        dataArr.push(data); console.log(dataArr)
        let status = data.stream
        let groupClass = 'list-group-item list-group-item-danger'
        let descrip = 'offline'
        let logo = ''
        let channelURL = 'https://www.twitch.tv/' + member
        if (status !== null) {
            groupClass = 'list-group-item list-group-item-success online'
            descrip = data.stream.channel.game
            logo = '<img class="logoThumb" src=' + data.stream.channel.logo + '>'
              
        }
        
                
        $('#members').append(
        $('<a/>')
            .addClass(groupClass)
            .addClass('memberWell')
            .prop('href', channelURL)
            .attr('id', member)
            .prop('target','_blank')
            .html('<h3>'+ member + '</h3><h4><i>' + descrip + '</i></h4>' + logo)
            
        )
    });
} 



// '<img class="logoThumb" src=' + logo+ '>'







// $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
//   console.log(data);
//   var status = data.stream
//   console.log(status)
// });
// var url = 'https://api.twitch.tv/kraken/streams/freecodecamp?callback=?'
// var twitchObj = {}