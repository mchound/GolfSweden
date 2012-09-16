//Document ready

$(function () {
    
    var sections = [{ name: 'index' }, { name: 'ranking' }, { name: 'review' }, { name: 'trip' }, { name: 'info' }, { name: 'contact' }];

    //Link clicked ------------------------------------------------
    $('#navigation ul li').click(function (eventObject) {                
        var idClicked = $(eventObject.delegateTarget).children('a').attr('id');
        var sectionClicked = idClicked.replace('link_', '');
        setLinkMenu(idClicked);
        setSectionView(sectionClicked, sections);            
        });
    //-------------------------------------------------------------------------

    //-----------------------------------------------------------------------
    $('#rev_club').change(function () {
        var clubName = $("select option:selected").text();
        $('#review .headerTitle').text('Ny recension - ' + clubName);
    });
    //-----------------------------------------------------------------------

    //Gender choose on new review-------------------------------------------
    $('#genderRadio button').click(function (eventObject) {
        $('#genderRadio button').removeClass('selected');        
        $(eventObject.target).addClass('selected');
    });
    //---------------------------------------------------------------------

    $('#hcp').change(function (eventObject) {
        var oldText = $('#hcp').val();
        var newText = oldText.replace(',', '.');
        $('#hcp').val(newText);
    });
    
});

function setSectionView(sectionId, sectionCollection) {
    
    for (var i = 0; i < sectionCollection.length; i++) {
        
        var sectionName = sectionCollection[i].name;
        var activeState = $('#' + sectionName).attr('active');

        if (activeState === 'true') {
            $('#' + sectionName).fadeOut('slow', function () {
                $('#' + sectionName).attr('active', 'false');
                $('#' + sectionId).slideDown('slow', function () {
                    $('#' + sectionId).attr('active', 'true');
                });
            });
            break;
        }
    }    

    if (sectionId === 'club') {
        initializeMap();
    }    
}

function setLinkMenu(linkItemId) {
    $.each($('#navigation ul li'), function (index, element) {
            
        var b = $(element).children('a')

        if ($(b).attr('id') === linkItemId) {
            $(element).children('a').addClass('current');
            $(element).children('img').css('display', 'block');
        }
        else {                
            $(element).children('a').removeClass('current');
            $(element).children('img').css('display', 'none');                
        }

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

