//Document ready

$(function () {
    
    $('#navigation').tobNavigationJS();
    PopulateReviewHeaderOnClubChange();
    $.tobRadioButtonJS();
    LoadClubData();
    GetCoursesOnClubChange();

    //Switch , for . in hcp input---------------------------------------------------------------------
    $('#hcp').change(function (eventObject) {
        var oldText = $('#hcp').val();
        var newText = oldText.replace(',', '.');
        $('#hcp').val(newText);
    });

});

function GetCoursesOnClubChange(){
    $('#rev_club').change(function () {
        var clubId = $('#rev_club option:selected').attr('value');
        var clubName = $('#rev_club option:selected').text();
        $('#rev_courses').parent().removeClass('selectLoaded').addClass('selectLoading');
        $('#rev_courses option:selected').text('Laddar banor för ' + clubName + '...');
        $.ajax({
            url: "http://localhost:50542/api/golf/?clubId=" + clubId
        }).done(function (data) {
            InitCoursesDropdown(data);
        }).fail(function () {
            alert("Failed loading courses");
        });
    });
}

function LoadClubData(){
    $.ajax({
        url: "http://localhost:50542/api/golf",
    }).done(function (clubs) {        
        
        $('#rev_club').parent().removeClass('selectLoading').addClass('selectLoaded');
        $('#rev_club option:selected').text('- - - Välj golfklubb - - -');
        $('#rev_homeClub').parent().removeClass('selectLoading').addClass('selectLoaded');
        $('#rev_homeClub option:selected').text('- - - Välj din hemmaklubb - - -');
        $.each(clubs, function (index, club) {
            $('#rev_club').append('<option value=' + club.id + '>' + club.name + '</option>');
            $('#rev_homeClub').append('<option value=' + club.id + '>' + club.name + '</option>');
        });

    }).fail(function () {
        $('#rev_club').parent().removeClass('selectLoading').addClass('selectLoaded');
        $('#rev_club option:selected').text(' - Kunde inte hämta klubbar från server -');
        $('#rev_homeClub').parent().removeClass('selectLoading').addClass('selectLoaded');
        $('#rev_homeClub option:selected').text(' - Kunde inte hämta klubbar från server -');
    });
}

function PopulateReviewHeaderOnClubChange(){
    $('#rev_club').change(function () {
        var clubName = $("select option:selected").text();
        $('#review .headerTitle').text('Ny recension - ' + clubName);
    });
}

function InitCoursesDropdown(courses) {    
    $('#rev_courses').parent().removeClass('selectLoading').addClass('selectLoaded');
    $('#rev_courses option:selected').text('- - - Välj spelad bana - - -');
    $.each(courses, function (index, course) {
        $('#rev_courses').append('<option value=' + course.id + '>' + course.name + '</option>');
    });
}

function initializeMap() {
    var mapOptions = {
        center: new google.maps.LatLng(57.778673, 11.955528),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
}

