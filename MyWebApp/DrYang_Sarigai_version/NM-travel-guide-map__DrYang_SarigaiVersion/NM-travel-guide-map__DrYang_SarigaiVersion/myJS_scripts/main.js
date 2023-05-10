d3.csv("data/NMPlacesDataSheet.csv").then(function(data) {
    var USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 20,
            attribution: '© <a href="https://usgs.gov/">U.S. Geological Survey</a>'
        }),

        OpenStreetMap = L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
            attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 20,
            // subdomains: 'abcd',
            accessToken: 'cEsmm0rHmqiHCbTmgVEXQ7mBXFcxtmKzCq4JNxCK75itmwK5d13tLxEQiwUQ9M8k'
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
        layers: [OpenStreetMap, USGS_USImagery],
        // leaflet full screen plugin https://github.com/Leaflet/Leaflet.fullscreen
        fullscreenControl: {
            pseudoFullscreen: false
        }
    });
    var baseMaps = {
        "USGS Satellite": USGS_USImagery,
        "OpenStreetMap": OpenStreetMap,
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
            d["URL"],
            d["established_Year"],
            d["Site Name"]
        ];

    });
    var typeDim = ndx.dimension(function(d) {
        return d["type"];
    });

    var groupname = "marker-select";
    var all = ndx.groupAll();
    var locationGroup = locationDim.group().reduce(function(p, v) {
            p["Latitude"] = v["Latitude"]
            p["Longitude"] = v["Longitude"]
            p["type"] = v["type"]
            p["URL"] = v["URL"]
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



    var typeChart = dc.pieChart('#chart-ring-type', groupname);

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
                "<dt><span style='font-weight:bolder'>Established Year: </span> </dt> <dd>" + kv.value.established_Year + "<dd>" +
                "<dd>" +
                                    // "<img src='" + profile_pic_url + "' width=auto height=50/>" //this is the static image version
                                    "<img src='" + "/images/" + kv.value.image + "'" + " width=auto height=50 " + " class=profilePic " + "/>" // not that the space between to quotes and the class name matters.
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
        .size(5)
        .columns([{
                label: 'Site Name',
                type: 'html',
                format: function(d) {
                    return '<a href= "' + d["URL"] + '" target="_blank">' + d["Site Name"] + "</a>";;

                }

            }, {
                label: 'type',
                type: 'html',
                format: function(d) {
                    return d["type"];
                }

            }, {
                label: 'year',
                type: 'html',
                format: function(d) {
                    return d["established_Year"];
                }

            }, {
                label: 'openingDates',
                type: 'html',
                format: function(d) {
                    return d["openingDates"];
                }

            }, {
                label: 'activities',
                type: 'html',
                format: function(d) {
                    return d["activities"];
                }

            }, {
                label: 'facebook_account',
                type: 'html',
                format: function(d) {
                    return d["facebook_account"];
                }

            }, {
                label: 'instagram_account',
                type: 'html',
                format: function(d) {
                    return d["instagram_account"];
                }

            }, {
                label: 'twitter_account',
                type: 'html',
                format: function(d) {
                    return d["twitter_account"];
                }

            }, {
                label: 'admission',
                type: 'html',
                format: function(d) {
                    return d["admission"];
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