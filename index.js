
var globalDB = [];
var allRecords = [];

function initializeDB() {
    loaddata();
}

function toggleArrowUp(event) {
    console.log("Hello");
    $(event).removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(event).parent().next().hide();
    $(event).attr('onclick', 'toggleArrowDown(this)');
}
function toggleArrowDown(event) {
    console.log("Hello");
    $(event).removeClass('fa-chevron-down').addClass('fa-chevron-up');
    $(event).parent().next().show();
    $(event).attr('onclick', 'toggleArrowUp(this)');
}

function textCount(event, totalCharacters) {
    console.log("Checking");
    var remaining = totalCharacters - $(event).val().length;
    $(event).nextAll()[1].innerHTML = remaining + ' / ' + totalCharacters + ' Characters left';
}


function addData(event) {
    var chooseDate = $(event).prevAll()[18].value;
    var eventName = $(event).prevAll()[15].value;
    var startdate = $(event).prevAll()[10].value;
    var enddate = $(event).prevAll()[7].value;
    var description = $(event).prevAll()[4].value;

    if (enddate <= startdate) {
        alert('Select correct Start time and End time.');
        return;
    }


    var singleRecord = [];
    singleRecord.push(chooseDate);
    singleRecord.push(eventName);
    singleRecord.push(startdate);
    singleRecord.push(enddate);
    singleRecord.push(description);

    globalDB.push(singleRecord);

    // Session Storage
    var allRecord = [];
    try {
        var prevRecord = sessionStorage.getItem('Record').split(',');
        allRecord.push(prevRecord);
    }
    catch (err) {

    }
    allRecord.push(singleRecord);
    sessionStorage.setItem("Record", allRecord);


    loaddata();

}


function loaddata() {
    var x = sessionStorage.getItem('Record').split(',');

    if(x.length % 5 !=0)
        x.splice(0,1);
    if(x.length==0){
            $('#boxContainer').html('No records found.');
            return;
        }
    allRecords = [];

    for (let i = 0; i < x.length; i += 5) {
        allRecords.push(x.slice(i, i + 5));
    }
    console.log(allRecords);

    var boxValue = '';
    for (let i = 0; i < allRecords.length; i++) {
        var eventDate = allRecords[i][0];
        var eventName = allRecords[i][1];
        var startDate = allRecords[i][2];
        var endDate = allRecords[i][3];
        var description = allRecords[i][4];

        boxValue += '<p>' + eventDate + '</p>' + '<div class="box" id="box1"><div class="topDiv"><div class="star"> <i class=\'fas fa-star\'></i></div><div class="stet"><b><font class="text">' + startDate + '-' + endDate + ' <i class=\'fas fa-chevron-circle-right\'> </i></font></b></div><div class="arrow"></i></div><div class="gap"></div><div class="delIcon" onclick="deleteCard('+i+')"><i class=\'fas fa-trash\'></i></div></div><p class="eventName">' + eventName + '</p><p class="downarrow"><i class=\'fas fa-chevron-down\' style=\'font-size:24px\' onclick="toggleArrowDown(this)"></i></p><p class="description" hidden>' + description + '</p></div>';

        console.log(boxValue);

        $('#boxContainer').html(boxValue);
    }

}

function deleteCard(index){
    allRecords.splice(index,1);
    $('#boxContainer').html('');
    sessionStorage.setItem("Record", allRecords);
    if(allRecords.length!=0)
        loaddata();
    else    
        $('#boxContainer').html('No records found.');
}


function dateFilter() {
    var selectedDate = $(".date3").val();
    var filteredRecords = allRecords.filter(record => record[0] === selectedDate);
    if (filteredRecords.length === 0) {
        $('#boxContainer').html('No events found for selected date.');
    } else {
        var boxValue = '';
        for (let i = 0; i < filteredRecords.length; i++) {
            var eventDate = filteredRecords[i][0];
            var eventName = filteredRecords[i][1];
            var startDate = filteredRecords[i][2];
            var endDate = filteredRecords[i][3];
            var description = filteredRecords[i][4];

            boxValue += '<p>' + eventDate + '</p>' + '<div class="box" id="box1"><div class="topDiv"><div class="star"> <i class=\'fas fa-star\'></i></div><div class="stet"><b><font class="text">' + startDate + '-' + endDate + ' <i class=\'fas fa-chevron-circle-right\'> </i></font></b></div><div class="arrow"></i></div><div class="gap"></div><div class="delIcon" onclick="deleteCard(' + i + ')"><i class=\'fas fa-trash\'></i></div></div><p class="eventName">' + eventName + '</p><p class="downarrow"><i class=\'fas fa-chevron-down\' style=\'font-size:24px\' onclick="toggleArrowDown(this)"></i></p><p class="description" hidden>' + description + '</p></div>';
        }
        $('#boxContainer').html(boxValue);
    }
}

