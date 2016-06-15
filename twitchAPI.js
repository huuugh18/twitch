$(document).ready(function(){ 
        
})

let memberURL = []
let memberArr = ['freecodecamp', 'lassiz', 'test_channel', '2GD', 'Impaktpt', 'RobotCaleb', 'noobs2ninjas', 'DotaMajor', 'brineMaster12', 'brunofin']
getURL(memberArr)

let dataArr = []
for (let i = 0; i < memberArr.length; i++ ) {
    let member = memberArr[i]
    
    $.getJSON(memberURL[i], function(data) {
        let memberStatus = !!data.error ? data.status : 0
        
        dataArr.push({data:data, name:member, status:memberStatus}); 
        dataArr.sort(function(a,b){
            let aOnline = !!a.data.stream
            let bOnline = !!b.data.stream
            let aStatus = a.status
            let bStatus = b.status
            if (a.status > b.status) return 1
            if (a.status < b.status) return -1
            if (a.status> 0 && b.status >0) return 0
            if (aOnline && bOnline) return compareNames(a.name,b.name)
            if (aOnline) return -1
            if (bOnline) return 1
            return compareNames(a.name,b.name) 
            

            
            
        })
        console.log(dataArr)
        let status = data.stream
        let channelURL = 'https://www.twitch.tv/' + member
        $('#members').empty()
        for (let i = 0; i < dataArr.length; i++) {
            let item = dataArr[i]
            let info = getInfo(item)
            $('#members').append(
            $('<a/>')
                .addClass(info.groupClass)
                .addClass('memberWell')
                .prop('href', channelURL)
                .attr('id', member)
                .prop('target','_blank')
                .html('<div class=\'c1\'><h3>'+ item.name + '</h3><h4><i>' + info.descrip + '</i></h4></div><div class=\'c2\'>' + info.logo +'</div>')
            )      

        }        
            
    });
} 

function getInfo(item){
    let online = !!item.data.stream
    switch (item.status){
        case 0: 
            if (online) return { 
                groupClass: 'list-group-item list-group-item-success online',
                descrip: item.data.stream.channel.game,
                logo: '<img class="logoThumb" src=' + item.data.stream.channel.logo + '>'
            }
            return {
                groupClass: 'list-group-item list-group-item-danger',
                descrip: 'offline',
                logo: ''
            }
        case 404:
            return {
                groupClass: 'list-group-item disabled',
                descrip: 'User does not exist',
                logo: ''
            }
        case 422:
            return {
                groupClass: 'list-group-item disabled',
                descrip: 'User account closed',
                logo: ''
            }
    }
    
       
}
function compareNames(a,b){
    a = a.toUpperCase()
    b = b.toUpperCase()
    if (a < b) return -1
    if (a > b) return 1
    return 0
}        
function getURL(memberArr){
    for (let i = 0; i <memberArr.length; i++) {
    memberURL[i] = 'https://api.twitch.tv/kraken/streams/' + memberArr[i] + '?callback=?'
    }       
}
