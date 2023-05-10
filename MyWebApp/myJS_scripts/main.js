d3.csv("data/NMPlacesDataSheet.csv").then(function(data) {
    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16
    });

    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16
            // subdomains: 'abcd',

    });
    // OpenStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
    //     maxZoom: 18,

    //     attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    // });

    var map = L.map('map', {
        // center: [47, -16.7],
        // minZoom: 0,
        // maxZoom: 15,
        // zoomSnap: 1.5,
        // zoomDelta: 0,
        zoom: 10,
        layers: [Esri_NatGeoWorldMap, Esri_NatGeoWorldMap],
        // leaflet full screen plugin https://github.com/Leaflet/Leaflet.fullscreen
        fullscreenControl: {
            pseudoFullscreen: false
        }
    });
    var baseMaps = {
        "Esri_NatGeoWorldMap": Esri_NatGeoWorldMap,
        "Esri_NatGeoWorldMap": Esri_NatGeoWorldMap,
        // "Host Count Choropleth": choropleth_layer

    };
    // L.control.layers(baseMaps).addTo(map);
    L.control.betterscale().addTo(map);
    // L.control.scale({ position: 'bottomleft' }).addTo(map);

    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // var osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    map.setView(new L.LatLng(59.92448055859924, 10.758276373601069), 12);
    // map.setView(new L.LatLng(150.92448055859924, 100.758276373601069), 10);

    var osm2 = new L.TileLayer(osmUrl, {
        minZoom: 0,
        maxZoom: 13,
        // attribution: osmAttrib
    });
    var miniMap = new L.Control.MiniMap(osm2, {
        toggleDisplay: true,
        width: 100,
        height: 100
    }).addTo(map);

    // add north arrow to the map
    var north = L.control({ position: "bottomright" });
    north.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend", );
        div.innerHTML = '<img src="images/norhArrow_1.png" "width=45 height=45" >';
        return div;
    }
    north.addTo(map);
    L.control.layers(baseMaps).addTo(map);

    ndx = crossfilter(data);

    var allDim = ndx.dimension(function(d) {
        return d;
    });

    var locationDim = ndx.dimension(function(d) {
        return [d["Latitude"],
            d["Longitude"],
            d["type"],
            d["nearest_City"], //dr.Yang added
            d["URL"],
            d["Wikipedia URL"], //dr.Yang added
            d["established_Year"],
            d["Site Name"],
           
        ];

    });

    var typeDim = ndx.dimension(function(d) {
        return d["type"];
    });

    var nearestCityDim = ndx.dimension(function(d) {
        return d["nearest_City"]; // dr. Yang added
    });



    var groupname = "marker-select";
    var all = ndx.groupAll();
    var locationGroup = locationDim.group().reduce(function(p, v) {
            p["Latitude"] = v["Latitude"]
            p["Longitude"] = v["Longitude"]
            p["type"] = v["type"]
            p["nearest_City"] = v["nearest_City"]// dr. Yang added
            p["URL"] = v["URL"]
            p["Wikipedia URL"] = v["Wikipedia URL"] //dr. Yang added
            p["image"] = v["image"]           
            p["established_Year"] = v["established_Year"]
            p["Site Name"] = v["Site Name"]
                ++p.count;
            return p;
        },
        function(p, v) {
            --p.count;
            return p;
        },
        function() {
            return {
                count: 0
            };
        });

    var typeGroup = typeDim.group().reduceCount();

    var nearestCityGroup = nearestCityDim.group().reduceCount(); // dr. Yang added


    var typeChart = dc.pieChart('#chart-ring-type', groupname);

    var nearestCityChart = dc.pieChart('#chart-ring-nearestCity', groupname); // dr. Yang added

    var dataTableCount = dc.dataCount('.dc-dataTable-count', groupname);
    var dataTable = dc_datatables.datatable('#data-table', groupname);
    var dataCount = dc.dataCount('.dc-dataTitle-count', groupname);

    var d3SchemeCategory20c = ['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d', '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476', '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc', '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9']

    var paperMarkers = dc_leaflet.markerChart("#cluster-map-anchor", groupname)
        .dimension(locationDim)
        .group(locationGroup)
        .map(map)
        // .center([47, -16.7])
        // .zoom(1)
        .valueAccessor(function(kv) {
            return kv.value.count;
        })
        .locationAccessor(function(kv) {
            return [kv.value.Latitude, kv.value.Longitude];
        })
        .showMarkerTitle(false)
        .fitOnRender(true)
        .fitOnRedraw(true)
        .filterByArea(true)
        .cluster(true)
        .popup(function(kv, marker) {

            return "<dt><span style='font-weight:bolder'>Site Name: </span> </dt> <dd>" + kv.value["Site Name"] + "<dd>" +
                "<dt><span style='font-weight:bolder'>Type: </span> </dt> <dd>" + kv.value.type + "<dd>" +
                "<dt><span style='font-weight:bolder'>Official Page: </span> </dt> <dd>" + '<a href= "' + kv.value.URL + '" target="_blank">' + "Click to access the page" + "</a>" + "<dd>" +
                "<dt><span style='font-weight:bolder'>Wikipedia Page: </span> </dt> <dd>" + '<a href= "' + kv.value["Wikipedia URL"] + '" target="_blank">' + "Click to access the page" + "</a>" + "<dd>" +
                "<dt><span style='font-weight:bolder'>Established Year: </span> </dt> <dd>" + kv.value.established_Year + "<dd>" +
                "<dt><span style='font-weight:bolder'>Nearest City: </span> </dt> <dd>" + kv.value.nearest_City + "<dd>" +
                "<dt><span style='font-weight:bolder'>Image: </span> </dt> <dd>" +
                // "<img src='" + profile_pic_url + "' width=auto height=50/>" //this is the static image version
                // "<img src='" + "images/" + kv.value["image"] + "'" + "width=auto height=50 " + " class=profilePic "  + ">" + "<dd>" // not that the space between to quotes and the class name matters.
                "<img src='" + "park_images/" + kv.value.image + "'" + " width=auto height=50 " + " class=profilePic " + "/>"
                // this one has enlarge image effect after hover over profile image. 


        })
        .clusterOptions({
            spiderfyOnMaxZoom: true,
            spiderLegPolylineOptions: {
                weight: 3,
                color: '#000',
                opacity: 0.8
            }
        });

    typeChart
        .width(245)
        .height(280)
        .innerRadius(70)
        .dimension(typeDim)
        .group(typeGroup)
        .legend(new dc.HtmlLegend()
            .container('#type-legend')
            .horizontal(false)
            .highlightSelected(true));

//dr. Yang added
    nearestCityChart
    .width(245)
    .height(280)
    .innerRadius(70)
    .dimension(nearestCityDim)
    .group(nearestCityGroup)
    .legend(new dc.HtmlLegend()
        .container('#nearestCity-legend')
        .horizontal(false)
        .highlightSelected(true));        



    dataCount
        .dimension(ndx)
        .group(all);

    dataTableCount
        .dimension(ndx)
        .group(all)

    dataTable
        .dimension(allDim)
        .group(function(d) {
            return 'dc.js insists on putting a row here so I remove it using JS';
        })
        .size(8)
        .columns([{
                label: 'Site Name',
                type: 'html',
                format: function(d) {
                    return '<a href= "' + d["URL"] + '" target="_blank">' + d["Site Name"] + "</a>";;

                }

            }, {
                label: 'year',
                type: 'html',
                format: function(d) {
                    return d["established_Year"];
                }

            }, {
                label: 'Nearest City',
                type: 'html',
                format: function(d) {
                    return d["nearest_City"];
                }

            }, {
                label: 'type',
                type: 'html',
                format: function(d) {
                    return d["type"];
                }


            }, {
                label: 'Opening Dates',
                type: 'html',
                format: function(d) {
                    return d["openingDates"];
                }

            }, {
                label: 'Opening Time',
                type: 'html',
                format: function(d) {
                    return d["openingTime"];
                }

            }, {
                label: 'Facebook Account',
                type: 'html',
                format: function(d) {
                    // return d["facebook_account"];
                   return '<a href= "' + d["facebook_account"] + '" target="_blank">' + "facebook link" + "</a>";;
                }

            }, {
                label: 'Instagram Account',
                type: 'html',
                format: function(d) {
                    // return d["instagram_account"];
                    return '<a href= "' + d["instagram_account"] + '" target="_blank">' + "instagram link" + "</a>";;
                }

            }, {
                label: 'Twitter Account',
                type: 'html',
                format: function(d) {
                    // return d["twitter_account"];
                    return '<a href= "' + d["twitter_account"] + '" target="_blank">' + "twitter link" + "</a>";;
                }

            },




        ])


    .sortBy(function(d) {
            return d.Title;
        })
        .order(d3.ascending)
        .options({
            "scrollX": true
        })
        .on('renderlet', function(table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });

    d3.selectAll('a#all').on('click', function() {
        dc.filterAll(groupname);
        dc.renderAll(groupname);
    });

    d3.selectAll('a#type').on('click', function() {
        GreenSpaceTypeChart.filterAll(groupname);
        dc.redrawAll(groupname);
    });


    $("#mapReset").on('click', function() {
        // paperMarkers.map().setView([24.5, 1.343465], 1);
        // paperMarkers.map().setView([47, -16.7], 1);
        paperMarkers.map().setView([19.7, 4.1], 2);
    });

    dc.renderAll(groupname);
    dc.redrawAll(groupname);
});



$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// var offset = 70;
// $('.navbar li a').click(function(event) {
//     event.preventDefault();
//     $($(this).attr('href'))[0].scrollIntoView();
//     scrollBy(0, -offset);
// });

var navOffset = $('.navbar').height();

$('.navbar li a').click(function(event) {
    var href = $(this).attr('href');

    event.preventDefault();
    window.location.hash = href;

    $(href)[0].scrollIntoView();
    window.scrollBy(0, -navOffset);
});