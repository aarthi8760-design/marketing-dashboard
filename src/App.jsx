import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const RAW_DATA = [{"date":"2024-01-01","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":127.5,"revenue":420.0,"clicks":892,"impressions":45623,"conversions":12},{"date":"2024-01-01","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"North America","spend":215.8,"revenue":1190.0,"clicks":567,"impressions":12456,"conversions":34},{"date":"2024-01-01","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"North America","spend":189.9,"revenue":805.0,"clicks":1234,"impressions":34567,"conversions":23},{"date":"2024-01-01","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Desktop","region":"LATAM","spend":98.3,"revenue":280.0,"clicks":445,"impressions":28934,"conversions":8},{"date":"2024-01-01","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":234.5,"revenue":2250.0,"clicks":1234,"impressions":23456,"conversions":45},{"date":"2024-01-01","platform":"Google","campaign":"Search_Generic_Terms","device":"Mobile","region":"Europe","spend":567.8,"revenue":1150.0,"clicks":890,"impressions":45678,"conversions":23},{"date":"2024-01-01","platform":"Google","campaign":"Shopping_All_Products","device":"Mobile","region":"North America","spend":423.6,"revenue":3350.0,"clicks":2345,"impressions":67890,"conversions":67},{"date":"2024-01-01","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"North America","spend":189.4,"revenue":850.0,"clicks":567,"impressions":89234,"conversions":17},{"date":"2024-01-01","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"North America","spend":456.7,"revenue":952.0,"clicks":3456,"impressions":234567,"conversions":34},{"date":"2024-01-01","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":678.9,"revenue":1876.0,"clicks":2345,"impressions":123456,"conversions":67},{"date":"2024-01-01","platform":"TikTok","campaign":"Traffic_Campaign","device":"Tablet","region":"APAC","spend":345.6,"revenue":644.0,"clicks":2890,"impressions":189234,"conversions":23},{"date":"2024-01-01","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"North America","spend":789.4,"revenue":1652.0,"clicks":4567,"impressions":312456,"conversions":59},{"date":"2024-01-02","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"LATAM","spend":118.2,"revenue":350.0,"clicks":823,"impressions":42345,"conversions":10},{"date":"2024-01-02","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"LATAM","spend":234.5,"revenue":1330.0,"clicks":623,"impressions":13678,"conversions":38},{"date":"2024-01-02","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Desktop","region":"APAC","spend":201.3,"revenue":875.0,"clicks":1345,"impressions":37234,"conversions":25},{"date":"2024-01-02","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"Europe","spend":87.6,"revenue":245.0,"clicks":389,"impressions":25678,"conversions":7},{"date":"2024-01-02","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":256.8,"revenue":2450.0,"clicks":1345,"impressions":25678,"conversions":49},{"date":"2024-01-02","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"North America","spend":589.4,"revenue":1250.0,"clicks":923,"impressions":47234,"conversions":25},{"date":"2024-01-02","platform":"Google","campaign":"Shopping_All_Products","device":"Mobile","region":"APAC","spend":445.7,"revenue":3550.0,"clicks":2456,"impressions":71234,"conversions":71},{"date":"2024-01-02","platform":"Google","campaign":"Display_Remarketing","device":"Mobile","region":"Europe","spend":201.3,"revenue":900.0,"clicks":589,"impressions":92345,"conversions":18},{"date":"2024-01-02","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"APAC","spend":489.3,"revenue":1008.0,"clicks":3678,"impressions":245678,"conversions":36},{"date":"2024-01-02","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":712.4,"revenue":1960.0,"clicks":2456,"impressions":134567,"conversions":70},{"date":"2024-01-02","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"North America","spend":367.8,"revenue":700.0,"clicks":3012,"impressions":198765,"conversions":25},{"date":"2024-01-02","platform":"TikTok","campaign":"Influencer_Collab","device":"Tablet","region":"Europe","spend":812.3,"revenue":1708.0,"clicks":4789,"impressions":323456,"conversions":61},{"date":"2024-01-03","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":134.7,"revenue":490.0,"clicks":956,"impressions":48234,"conversions":14},{"date":"2024-01-03","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"Europe","spend":198.6,"revenue":1050.0,"clicks":534,"impressions":11234,"conversions":30},{"date":"2024-01-03","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"North America","spend":178.4,"revenue":770.0,"clicks":1189,"impressions":32456,"conversions":22},{"date":"2024-01-03","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Tablet","region":"North America","spend":112.4,"revenue":315.0,"clicks":501,"impressions":31234,"conversions":9},{"date":"2024-01-03","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"Europe","spend":223.4,"revenue":2150.0,"clicks":1189,"impressions":22345,"conversions":43},{"date":"2024-01-03","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"North America","spend":545.6,"revenue":1100.0,"clicks":856,"impressions":43567,"conversions":22},{"date":"2024-01-03","platform":"Google","campaign":"Shopping_All_Products","device":"Desktop","region":"North America","spend":401.2,"revenue":3200.0,"clicks":2234,"impressions":64567,"conversions":64},{"date":"2024-01-03","platform":"Google","campaign":"Display_Remarketing","device":"Mobile","region":"LATAM","spend":178.9,"revenue":800.0,"clicks":545,"impressions":85678,"conversions":16},{"date":"2024-01-03","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"North America","spend":423.6,"revenue":868.0,"clicks":3234,"impressions":219876,"conversions":31},{"date":"2024-01-03","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":645.8,"revenue":1792.0,"clicks":2189,"impressions":119876,"conversions":64},{"date":"2024-01-03","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":312.4,"revenue":588.0,"clicks":2678,"impressions":174567,"conversions":21},{"date":"2024-01-03","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"North America","spend":734.5,"revenue":1568.0,"clicks":4312,"impressions":298765,"conversions":56},{"date":"2024-01-04","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Tablet","region":"Europe","spend":142.1,"revenue":560.0,"clicks":1023,"impressions":51234,"conversions":16},{"date":"2024-01-04","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"North America","spend":245.6,"revenue":1400.0,"clicks":678,"impressions":14567,"conversions":40},{"date":"2024-01-04","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"LATAM","spend":212.4,"revenue":945.0,"clicks":1456,"impressions":41234,"conversions":27},{"date":"2024-01-04","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"APAC","spend":76.5,"revenue":210.0,"clicks":334,"impressions":22345,"conversions":6},{"date":"2024-01-04","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":278.9,"revenue":2650.0,"clicks":1456,"impressions":27890,"conversions":53},{"date":"2024-01-04","platform":"Google","campaign":"Search_Generic_Terms","device":"Mobile","region":"APAC","spend":612.3,"revenue":1350.0,"clicks":978,"impressions":50123,"conversions":27},{"date":"2024-01-04","platform":"Google","campaign":"Shopping_All_Products","device":"Desktop","region":"Europe","spend":467.8,"revenue":3750.0,"clicks":2567,"impressions":78234,"conversions":75},{"date":"2024-01-04","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"North America","spend":212.5,"revenue":950.0,"clicks":634,"impressions":98765,"conversions":19},{"date":"2024-01-04","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"APAC","spend":512.3,"revenue":1064.0,"clicks":3912,"impressions":265432,"conversions":38},{"date":"2024-01-04","platform":"TikTok","campaign":"Conversion_Focus","device":"Tablet","region":"North America","spend":756.4,"revenue":2100.0,"clicks":2567,"impressions":145678,"conversions":75},{"date":"2024-01-04","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":389.5,"revenue":756.0,"clicks":3189,"impressions":212345,"conversions":27},{"date":"2024-01-04","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"LATAM","spend":867.2,"revenue":1848.0,"clicks":5123,"impressions":356789,"conversions":66},{"date":"2024-01-05","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":156.3,"revenue":630.0,"clicks":1123,"impressions":56234,"conversions":18},{"date":"2024-01-05","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"Europe","spend":223.4,"revenue":1225.0,"clicks":601,"impressions":12890,"conversions":35},{"date":"2024-01-05","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"North America","spend":195.7,"revenue":840.0,"clicks":1312,"impressions":36789,"conversions":24},{"date":"2024-01-05","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"North America","spend":103.8,"revenue":280.0,"clicks":462,"impressions":29876,"conversions":8},{"date":"2024-01-05","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"APAC","spend":245.6,"revenue":2350.0,"clicks":1289,"impressions":24567,"conversions":47},{"date":"2024-01-05","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"North America","spend":578.9,"revenue":1200.0,"clicks":912,"impressions":46789,"conversions":24},{"date":"2024-01-05","platform":"Google","campaign":"Shopping_All_Products","device":"Mobile","region":"North America","spend":434.5,"revenue":3400.0,"clicks":2389,"impressions":68901,"conversions":68},{"date":"2024-01-05","platform":"Google","campaign":"Display_Remarketing","device":"Mobile","region":"APAC","spend":196.7,"revenue":875.0,"clicks":578,"impressions":91234,"conversions":17},{"date":"2024-01-05","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"North America","spend":467.8,"revenue":980.0,"clicks":3567,"impressions":243210,"conversions":35},{"date":"2024-01-05","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":689.3,"revenue":1932.0,"clicks":2334,"impressions":128901,"conversions":69},{"date":"2024-01-05","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"LATAM","spend":356.7,"revenue":672.0,"clicks":2901,"impressions":193456,"conversions":24},{"date":"2024-01-05","platform":"TikTok","campaign":"Influencer_Collab","device":"Tablet","region":"North America","spend":812.4,"revenue":1708.0,"clicks":4789,"impressions":334567,"conversions":61},{"date":"2024-01-06","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Desktop","region":"LATAM","spend":123.4,"revenue":385.0,"clicks":867,"impressions":40123,"conversions":11},{"date":"2024-01-06","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"APAC","spend":267.8,"revenue":1505.0,"clicks":723,"impressions":15901,"conversions":43},{"date":"2024-01-06","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"Europe","spend":223.4,"revenue":980.0,"clicks":1534,"impressions":43210,"conversions":28},{"date":"2024-01-06","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"North America","spend":89.7,"revenue":245.0,"clicks":401,"impressions":26789,"conversions":7},{"date":"2024-01-06","platform":"Google","campaign":"Search_Brand_Terms","device":"Mobile","region":"Europe","spend":267.8,"revenue":2550.0,"clicks":1401,"impressions":26789,"conversions":51},{"date":"2024-01-06","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"APAC","spend":601.2,"revenue":1300.0,"clicks":956,"impressions":48901,"conversions":26},{"date":"2024-01-06","platform":"Google","campaign":"Shopping_All_Products","device":"Tablet","region":"LATAM","spend":456.7,"revenue":3600.0,"clicks":2501,"impressions":72345,"conversions":72},{"date":"2024-01-06","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"North America","spend":205.6,"revenue":925.0,"clicks":612,"impressions":95678,"conversions":18},{"date":"2024-01-06","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"APAC","spend":501.2,"revenue":1036.0,"clicks":3823,"impressions":259876,"conversions":37},{"date":"2024-01-06","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"North America","spend":723.4,"revenue":1988.0,"clicks":2456,"impressions":138901,"conversions":71},{"date":"2024-01-06","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":378.9,"revenue":728.0,"clicks":3078,"impressions":204321,"conversions":26},{"date":"2024-01-06","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"Europe","spend":845.6,"revenue":1764.0,"clicks":4978,"impressions":345678,"conversions":63},{"date":"2024-01-07","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":167.8,"revenue":700.0,"clicks":1212,"impressions":60123,"conversions":20},{"date":"2024-01-07","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"North America","spend":212.3,"revenue":1155.0,"clicks":572,"impressions":12567,"conversions":33},{"date":"2024-01-07","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Tablet","region":"APAC","spend":185.6,"revenue":805.0,"clicks":1245,"impressions":35012,"conversions":23},{"date":"2024-01-07","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"LATAM","spend":94.5,"revenue":280.0,"clicks":421,"impressions":28234,"conversions":8},{"date":"2024-01-07","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":289.5,"revenue":2750.0,"clicks":1512,"impressions":28901,"conversions":55},{"date":"2024-01-07","platform":"Google","campaign":"Search_Generic_Terms","device":"Mobile","region":"North America","spend":623.4,"revenue":1400.0,"clicks":989,"impressions":50234,"conversions":28},{"date":"2024-01-07","platform":"Google","campaign":"Shopping_All_Products","device":"Desktop","region":"Europe","spend":489.3,"revenue":3900.0,"clicks":2689,"impressions":81234,"conversions":78},{"date":"2024-01-07","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"APAC","spend":223.4,"revenue":1000.0,"clicks":667,"impressions":103456,"conversions":20},{"date":"2024-01-07","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"APAC","spend":534.5,"revenue":1092.0,"clicks":4078,"impressions":278901,"conversions":39},{"date":"2024-01-07","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":778.9,"revenue":2128.0,"clicks":2645,"impressions":149012,"conversions":76},{"date":"2024-01-07","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"North America","spend":401.2,"revenue":784.0,"clicks":3267,"impressions":217890,"conversions":28},{"date":"2024-01-07","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"North America","spend":878.9,"revenue":1876.0,"clicks":5189,"impressions":358901,"conversions":67},{"date":"2024-01-08","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"Europe","spend":138.9,"revenue":455.0,"clicks":978,"impressions":47234,"conversions":13},{"date":"2024-01-08","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"North America","spend":256.7,"revenue":1435.0,"clicks":690,"impressions":15123,"conversions":41},{"date":"2024-01-08","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"North America","spend":207.8,"revenue":910.0,"clicks":1389,"impressions":39012,"conversions":26},{"date":"2024-01-08","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Desktop","region":"Europe","spend":86.4,"revenue":210.0,"clicks":384,"impressions":24567,"conversions":6},{"date":"2024-01-08","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"LATAM","spend":212.3,"revenue":2050.0,"clicks":1112,"impressions":21234,"conversions":41},{"date":"2024-01-08","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"Europe","spend":556.7,"revenue":1150.0,"clicks":878,"impressions":44901,"conversions":23},{"date":"2024-01-08","platform":"Google","campaign":"Shopping_All_Products","device":"Mobile","region":"North America","spend":412.4,"revenue":3300.0,"clicks":2267,"impressions":66789,"conversions":66},{"date":"2024-01-08","platform":"Google","campaign":"Display_Remarketing","device":"Mobile","region":"North America","spend":187.6,"revenue":825.0,"clicks":556,"impressions":88901,"conversions":16},{"date":"2024-01-08","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"North America","spend":445.6,"revenue":924.0,"clicks":3401,"impressions":232456,"conversions":33},{"date":"2024-01-08","platform":"TikTok","campaign":"Conversion_Focus","device":"Tablet","region":"APAC","spend":667.8,"revenue":1848.0,"clicks":2267,"impressions":122345,"conversions":66},{"date":"2024-01-08","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":334.5,"revenue":644.0,"clicks":2734,"impressions":182345,"conversions":23},{"date":"2024-01-08","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"APAC","spend":801.2,"revenue":1680.0,"clicks":4723,"impressions":326789,"conversions":60},{"date":"2024-01-09","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"APAC","spend":149.6,"revenue":525.0,"clicks":1067,"impressions":52345,"conversions":15},{"date":"2024-01-09","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"LATAM","spend":234.5,"revenue":1295.0,"clicks":634,"impressions":13901,"conversions":37},{"date":"2024-01-09","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"LATAM","spend":192.3,"revenue":840.0,"clicks":1289,"impressions":36234,"conversions":24},{"date":"2024-01-09","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"North America","spend":108.7,"revenue":315.0,"clicks":484,"impressions":32345,"conversions":9},{"date":"2024-01-09","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":245.6,"revenue":2350.0,"clicks":1289,"impressions":24567,"conversions":47},{"date":"2024-01-09","platform":"Google","campaign":"Search_Generic_Terms","device":"Mobile","region":"LATAM","spend":567.8,"revenue":1200.0,"clicks":901,"impressions":46012,"conversions":24},{"date":"2024-01-09","platform":"Google","campaign":"Shopping_All_Products","device":"Desktop","region":"APAC","spend":423.6,"revenue":3400.0,"clicks":2323,"impressions":69012,"conversions":68},{"date":"2024-01-09","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"Europe","spend":194.5,"revenue":850.0,"clicks":578,"impressions":91789,"conversions":17},{"date":"2024-01-09","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"LATAM","spend":478.9,"revenue":1008.0,"clicks":3656,"impressions":249876,"conversions":36},{"date":"2024-01-09","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"North America","spend":701.2,"revenue":1960.0,"clicks":2378,"impressions":131234,"conversions":70},{"date":"2024-01-09","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":356.7,"revenue":700.0,"clicks":2901,"impressions":196789,"conversions":25},{"date":"2024-01-09","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"North America","spend":823.4,"revenue":1736.0,"clicks":4856,"impressions":337890,"conversions":62},{"date":"2024-01-10","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Tablet","region":"North America","spend":162.4,"revenue":595.0,"clicks":1156,"impressions":57890,"conversions":17},{"date":"2024-01-10","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"Europe","spend":278.9,"revenue":1540.0,"clicks":751,"impressions":16456,"conversions":44},{"date":"2024-01-10","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"North America","spend":218.6,"revenue":980.0,"clicks":1467,"impressions":41345,"conversions":28},{"date":"2024-01-10","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Desktop","region":"APAC","spend":91.2,"revenue":245.0,"clicks":406,"impressions":27012,"conversions":7},{"date":"2024-01-10","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"Europe","spend":301.2,"revenue":2850.0,"clicks":1578,"impressions":30123,"conversions":57},{"date":"2024-01-10","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"North America","spend":645.6,"revenue":1450.0,"clicks":1023,"impressions":52345,"conversions":29},{"date":"2024-01-10","platform":"Google","campaign":"Shopping_All_Products","device":"Tablet","region":"North America","spend":501.2,"revenue":4000.0,"clicks":2756,"impressions":84012,"conversions":80},{"date":"2024-01-10","platform":"Google","campaign":"Display_Remarketing","device":"Mobile","region":"LATAM","spend":212.3,"revenue":950.0,"clicks":634,"impressions":100234,"conversions":19},{"date":"2024-01-10","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"APAC","spend":523.4,"revenue":1064.0,"clicks":3989,"impressions":271234,"conversions":38},{"date":"2024-01-10","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":745.6,"revenue":2044.0,"clicks":2534,"impressions":143456,"conversions":73},{"date":"2024-01-10","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"North America","spend":378.9,"revenue":756.0,"clicks":3089,"impressions":208901,"conversions":27},{"date":"2024-01-10","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"Europe","spend":856.7,"revenue":1820.0,"clicks":5034,"impressions":350123,"conversions":65},{"date":"2024-01-15","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":171.3,"revenue":665.0,"clicks":1234,"impressions":62345,"conversions":19},{"date":"2024-01-15","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"North America","spend":289.5,"revenue":1610.0,"clicks":779,"impressions":17012,"conversions":46},{"date":"2024-01-15","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"Europe","spend":226.7,"revenue":1015.0,"clicks":1523,"impressions":43456,"conversions":29},{"date":"2024-01-15","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"LATAM","spend":97.8,"revenue":280.0,"clicks":435,"impressions":29012,"conversions":8},{"date":"2024-01-15","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":312.4,"revenue":2950.0,"clicks":1634,"impressions":31234,"conversions":59},{"date":"2024-01-15","platform":"Google","campaign":"Search_Generic_Terms","device":"Mobile","region":"APAC","spend":667.8,"revenue":1500.0,"clicks":1056,"impressions":54012,"conversions":30},{"date":"2024-01-15","platform":"Google","campaign":"Shopping_All_Products","device":"Desktop","region":"LATAM","spend":512.3,"revenue":4100.0,"clicks":2812,"impressions":86345,"conversions":82},{"date":"2024-01-15","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"North America","spend":223.4,"revenue":1000.0,"clicks":667,"impressions":103456,"conversions":20},{"date":"2024-01-15","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"North America","spend":556.7,"revenue":1120.0,"clicks":4256,"impressions":290123,"conversions":40},{"date":"2024-01-15","platform":"TikTok","campaign":"Conversion_Focus","device":"Tablet","region":"North America","spend":789.5,"revenue":2156.0,"clicks":2678,"impressions":152345,"conversions":77},{"date":"2024-01-15","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":412.3,"revenue":812.0,"clicks":3345,"impressions":224567,"conversions":29},{"date":"2024-01-15","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"APAC","spend":901.2,"revenue":1904.0,"clicks":5312,"impressions":367890,"conversions":68},{"date":"2024-01-20","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Desktop","region":"Europe","spend":145.6,"revenue":490.0,"clicks":1034,"impressions":50234,"conversions":14},{"date":"2024-01-20","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"APAC","spend":245.6,"revenue":1365.0,"clicks":661,"impressions":14567,"conversions":39},{"date":"2024-01-20","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"North America","spend":203.4,"revenue":910.0,"clicks":1367,"impressions":38456,"conversions":26},{"date":"2024-01-20","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"North America","spend":104.5,"revenue":315.0,"clicks":465,"impressions":31012,"conversions":9},{"date":"2024-01-20","platform":"Google","campaign":"Search_Brand_Terms","device":"Mobile","region":"LATAM","spend":256.7,"revenue":2450.0,"clicks":1345,"impressions":25678,"conversions":49},{"date":"2024-01-20","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"North America","spend":589.4,"revenue":1300.0,"clicks":934,"impressions":47890,"conversions":26},{"date":"2024-01-20","platform":"Google","campaign":"Shopping_All_Products","device":"Mobile","region":"Europe","spend":467.8,"revenue":3750.0,"clicks":2567,"impressions":78234,"conversions":75},{"date":"2024-01-20","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"APAC","spend":201.2,"revenue":900.0,"clicks":601,"impressions":96789,"conversions":18},{"date":"2024-01-20","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"LATAM","spend":489.5,"revenue":1008.0,"clicks":3734,"impressions":254678,"conversions":36},{"date":"2024-01-20","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":712.3,"revenue":1988.0,"clicks":2423,"impressions":133456,"conversions":71},{"date":"2024-01-20","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"North America","spend":367.8,"revenue":700.0,"clicks":2989,"impressions":201234,"conversions":25},{"date":"2024-01-20","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"Europe","spend":834.5,"revenue":1764.0,"clicks":4923,"impressions":342345,"conversions":63},{"date":"2024-01-25","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":158.9,"revenue":560.0,"clicks":1134,"impressions":55678,"conversions":16},{"date":"2024-01-25","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Desktop","region":"Europe","spend":223.4,"revenue":1225.0,"clicks":601,"impressions":13234,"conversions":35},{"date":"2024-01-25","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Mobile","region":"LATAM","spend":196.7,"revenue":875.0,"clicks":1323,"impressions":37345,"conversions":25},{"date":"2024-01-25","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"APAC","spend":88.9,"revenue":245.0,"clicks":396,"impressions":26345,"conversions":7},{"date":"2024-01-25","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"North America","spend":267.8,"revenue":2550.0,"clicks":1401,"impressions":26789,"conversions":51},{"date":"2024-01-25","platform":"Google","campaign":"Search_Generic_Terms","device":"Mobile","region":"Europe","spend":578.9,"revenue":1250.0,"clicks":912,"impressions":46789,"conversions":25},{"date":"2024-01-25","platform":"Google","campaign":"Shopping_All_Products","device":"Desktop","region":"North America","spend":478.9,"revenue":3850.0,"clicks":2634,"impressions":80123,"conversions":77},{"date":"2024-01-25","platform":"Google","campaign":"Display_Remarketing","device":"Mobile","region":"North America","spend":195.6,"revenue":875.0,"clicks":584,"impressions":93456,"conversions":17},{"date":"2024-01-25","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"APAC","spend":512.4,"revenue":1064.0,"clicks":3912,"impressions":267890,"conversions":38},{"date":"2024-01-25","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"North America","spend":734.5,"revenue":2044.0,"clicks":2501,"impressions":138901,"conversions":73},{"date":"2024-01-25","platform":"TikTok","campaign":"Traffic_Campaign","device":"Tablet","region":"APAC","spend":378.9,"revenue":728.0,"clicks":3078,"impressions":207654,"conversions":26},{"date":"2024-01-25","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"North America","spend":867.8,"revenue":1848.0,"clicks":5112,"impressions":354321,"conversions":66},{"date":"2024-01-30","platform":"Facebook","campaign":"Brand_Awareness_Q1","device":"Mobile","region":"North America","spend":175.4,"revenue":700.0,"clicks":1256,"impressions":63456,"conversions":20},{"date":"2024-01-30","platform":"Facebook","campaign":"Conversions_Retargeting","device":"Mobile","region":"North America","spend":301.2,"revenue":1680.0,"clicks":812,"impressions":17789,"conversions":48},{"date":"2024-01-30","platform":"Facebook","campaign":"Traffic_Drive_Jan","device":"Desktop","region":"Europe","spend":234.5,"revenue":1050.0,"clicks":1578,"impressions":44567,"conversions":30},{"date":"2024-01-30","platform":"Facebook","campaign":"Video_Views_Campaign","device":"Mobile","region":"LATAM","spend":112.3,"revenue":350.0,"clicks":501,"impressions":33456,"conversions":10},{"date":"2024-01-30","platform":"Google","campaign":"Search_Brand_Terms","device":"Desktop","region":"Europe","spend":323.4,"revenue":3050.0,"clicks":1690,"impressions":32345,"conversions":61},{"date":"2024-01-30","platform":"Google","campaign":"Search_Generic_Terms","device":"Desktop","region":"North America","spend":701.2,"revenue":1550.0,"clicks":1112,"impressions":56789,"conversions":31},{"date":"2024-01-30","platform":"Google","campaign":"Shopping_All_Products","device":"Mobile","region":"APAC","spend":534.5,"revenue":4250.0,"clicks":2934,"impressions":89456,"conversions":85},{"date":"2024-01-30","platform":"Google","campaign":"Display_Remarketing","device":"Desktop","region":"LATAM","spend":234.5,"revenue":1050.0,"clicks":701,"impressions":108901,"conversions":21},{"date":"2024-01-30","platform":"TikTok","campaign":"Awareness_GenZ","device":"Mobile","region":"North America","spend":578.9,"revenue":1148.0,"clicks":4423,"impressions":301234,"conversions":41},{"date":"2024-01-30","platform":"TikTok","campaign":"Conversion_Focus","device":"Mobile","region":"APAC","spend":823.4,"revenue":2240.0,"clicks":2801,"impressions":159012,"conversions":80},{"date":"2024-01-30","platform":"TikTok","campaign":"Traffic_Campaign","device":"Mobile","region":"APAC","spend":423.4,"revenue":840.0,"clicks":3456,"impressions":234567,"conversions":30},{"date":"2024-01-30","platform":"TikTok","campaign":"Influencer_Collab","device":"Mobile","region":"Europe","spend":934.5,"revenue":1960.0,"clicks":5512,"impressions":381234,"conversions":70}];

const PLATFORM_COLORS = { Facebook: "#1877F2", Google: "#EA4335", TikTok: "#010101" };
const PLATFORM_SOFT = { Facebook: "#E7F0FE", Google: "#FEE9E7", TikTok: "#F0F0F0" };

const fmt = (n) => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${n.toFixed(0)}`;
const fmtN = (n) => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(1)}K` : n.toLocaleString();
const fmtPct = (n) => `${(n * 100).toFixed(2)}%`;

function MultiSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const allSelected = value.length === 0;
  const display = allSelected ? "All" : value.length === 1 ? value[0] : `${value.length} selected`;
  return (
    <div style={{ position: "relative", minWidth: 140 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          border: "1px solid #d1d5db", borderRadius: 4, padding: "4px 8px",
          fontSize: 12, cursor: "pointer", background: "#fff", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 6,
          userSelect: "none", height: 28
        }}
      >
        <span style={{ color: "#6b7280", fontWeight: 500 }}>{label}:</span>
        <span style={{ color: "#111827", fontWeight: 600, flex: 1, marginLeft: 4 }}>{display}</span>
        <span style={{ color: "#9ca3af", fontSize: 10 }}>▾</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 2px)", left: 0, zIndex: 100,
          background: "#fff", border: "1px solid #e5e7eb", borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", minWidth: 180, padding: "4px 0"
        }}>
          <div
            onClick={() => { onChange([]); setOpen(false); }}
            style={{ padding: "6px 12px", fontSize: 12, cursor: "pointer",
              background: allSelected ? "#f3f4f6" : "transparent", color: "#374151",
              fontWeight: allSelected ? 600 : 400 }}
          >All {label}s</div>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => {
                const next = value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt];
                onChange(next);
              }}
              style={{ padding: "6px 12px", fontSize: 12, cursor: "pointer",
                background: value.includes(opt) ? "#eff6ff" : "transparent",
                color: value.includes(opt) ? "#1d4ed8" : "#374151",
                display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ width: 12, height: 12, border: `1.5px solid ${value.includes(opt) ? "#1d4ed8" : "#d1d5db"}`,
                borderRadius: 2, display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: value.includes(opt) ? "#1d4ed8" : "#fff", flexShrink: 0 }}>
                {value.includes(opt) && <span style={{ color: "#fff", fontSize: 9, lineHeight: 1 }}>✓</span>}
              </span>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, sub, delta, color }) {
  const pos = delta >= 0;
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6,
      padding: "10px 14px", flex: 1, minWidth: 0,
      borderTop: `3px solid ${color}`
    }}>
      <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        {sub && <span style={{ fontSize: 11, color: "#6b7280" }}>{sub}</span>}
        {delta !== undefined && (
          <span style={{ fontSize: 11, fontWeight: 600, color: pos ? "#059669" : "#dc2626" }}>
            {pos ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px", fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 4, color: "#374151" }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, display: "flex", gap: 8 }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.name.toLowerCase().includes("roas") ? p.value.toFixed(2)+"x" : p.name.toLowerCase().includes("spend") || p.name.toLowerCase().includes("revenue") ? fmt(p.value) : fmtN(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [platforms, setPlatforms] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [devices, setDevices] = useState([]);
  const [regions, setRegions] = useState([]);

  const allPlatforms = useMemo(() => [...new Set(RAW_DATA.map(d => d.platform))].sort(), []);
  const allCampaigns = useMemo(() => [...new Set(RAW_DATA.map(d => d.campaign))].sort(), []);
  const allDevices = useMemo(() => [...new Set(RAW_DATA.map(d => d.device))].sort(), []);
  const allRegions = useMemo(() => [...new Set(RAW_DATA.map(d => d.region))].sort(), []);

  const filteredData = useMemo(() => {
    return RAW_DATA.filter(d =>
      (platforms.length === 0 || platforms.includes(d.platform)) &&
      (campaigns.length === 0 || campaigns.includes(d.campaign)) &&
      (devices.length === 0 || devices.includes(d.device)) &&
      (regions.length === 0 || regions.includes(d.region))
    );
  }, [platforms, campaigns, devices, regions]);

  const kpis = useMemo(() => {
    const spend = filteredData.reduce((s, d) => s + d.spend, 0);
    const revenue = filteredData.reduce((s, d) => s + d.revenue, 0);
    const clicks = filteredData.reduce((s, d) => s + d.clicks, 0);
    const impressions = filteredData.reduce((s, d) => s + d.impressions, 0);
    const conversions = filteredData.reduce((s, d) => s + d.conversions, 0);
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const roas = spend > 0 ? revenue / spend : 0;
    const cpa = conversions > 0 ? spend / conversions : 0;
    return { spend, revenue, clicks, impressions, conversions, ctr, roas, cpa };
  }, [filteredData]);

  // Spend vs Revenue by date (grouped by week)
  const spendRevenueChart = useMemo(() => {
    const byDate = {};
    filteredData.forEach(d => {
      const dt = d.date.slice(5);
      if (!byDate[dt]) byDate[dt] = { date: dt, spend: 0, revenue: 0 };
      byDate[dt].spend += d.spend;
      byDate[dt].revenue += d.revenue;
    });
    return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date)).map(d => ({
      ...d,
      spend: Math.round(d.spend),
      revenue: Math.round(d.revenue)
    }));
  }, [filteredData]);

  // ROAS trend by date
  const roasTrend = useMemo(() => {
    const byDate = {};
    filteredData.forEach(d => {
      if (!byDate[d.date]) byDate[d.date] = { date: d.date.slice(5), spend: 0, revenue: 0 };
      byDate[d.date].spend += d.spend;
      byDate[d.date].revenue += d.revenue;
    });
    return Object.values(byDate)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(d => ({ date: d.date, ROAS: d.spend > 0 ? parseFloat((d.revenue / d.spend).toFixed(2)) : 0 }));
  }, [filteredData]);

  // Platform spend distribution
  const platformDist = useMemo(() => {
    const byPlatform = {};
    filteredData.forEach(d => {
      if (!byPlatform[d.platform]) byPlatform[d.platform] = { name: d.platform, value: 0 };
      byPlatform[d.platform].value += d.spend;
    });
    return Object.values(byPlatform).map(d => ({ ...d, value: Math.round(d.value) }));
  }, [filteredData]);

  // Campaign table
  const campaignTable = useMemo(() => {
    const byCamp = {};
    filteredData.forEach(d => {
      const key = `${d.platform}|${d.campaign}`;
      if (!byCamp[key]) byCamp[key] = { campaign: d.campaign, platform: d.platform, spend: 0, revenue: 0, conversions: 0 };
      byCamp[key].spend += d.spend;
      byCamp[key].revenue += d.revenue;
      byCamp[key].conversions += d.conversions;
    });
    return Object.values(byCamp)
      .map(d => ({
        ...d,
        roas: d.spend > 0 ? d.revenue / d.spend : 0,
        cpa: d.conversions > 0 ? d.spend / d.conversions : 0
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredData]);

  // AI Insights
  const insights = useMemo(() => {
    if (filteredData.length === 0) return [];
    const byPlatform = {};
    filteredData.forEach(d => {
      if (!byPlatform[d.platform]) byPlatform[d.platform] = { spend: 0, revenue: 0 };
      byPlatform[d.platform].spend += d.spend;
      byPlatform[d.platform].revenue += d.revenue;
    });
    const platforms = Object.entries(byPlatform).map(([p, v]) => ({ platform: p, roas: v.spend > 0 ? v.revenue / v.spend : 0, spend: v.spend }));
    const topPlatform = platforms.sort((a, b) => b.roas - a.roas)[0];
    const worstPlatform = [...platforms].sort((a, b) => a.roas - b.roas)[0];

    const byCamp = {};
    filteredData.forEach(d => {
      const k = d.campaign;
      if (!byCamp[k]) byCamp[k] = { spend: 0, revenue: 0 };
      byCamp[k].spend += d.spend;
      byCamp[k].revenue += d.revenue;
    });
    const camps = Object.entries(byCamp).map(([c, v]) => ({ campaign: c, roas: v.spend > 0 ? v.revenue / v.spend : 0 }));
    const bestCamp = camps.sort((a, b) => b.roas - a.roas)[0];
    const worstCamp = [...camps].sort((a, b) => a.roas - b.roas)[0];

    return [
      { icon: "🏆", color: "#059669", bg: "#ecfdf5", label: "Top Platform", text: `${topPlatform?.platform} leads with ${topPlatform?.roas.toFixed(2)}x ROAS` },
      { icon: "🎯", color: "#2563eb", bg: "#eff6ff", label: "Best Campaign", text: `${bestCamp?.campaign?.replace(/_/g, " ")} achieves ${bestCamp?.roas.toFixed(2)}x ROAS` },
      { icon: "⚠️", color: "#d97706", bg: "#fffbeb", label: "Needs Attention", text: `${worstCamp?.campaign?.replace(/_/g, " ")} at ${worstCamp?.roas.toFixed(2)}x ROAS — review targeting` },
      { icon: "💡", color: "#7c3aed", bg: "#f5f3ff", label: "Recommendation", text: `Shift budget from ${worstPlatform?.platform} to ${topPlatform?.platform} to maximize ROAS` },
    ];
  }, [filteredData]);

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: 13 }}>
      {/* HEADER */}
      <div style={{ background: "#1e293b", padding: "0 20px", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
          <span style={{ color: "#f8fafc", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em" }}>Marketing Intelligence Hub</span>
          <span style={{ color: "#64748b", fontSize: 11 }}>| Multi-Channel Performance Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#64748b", fontSize: 11 }}>Jan 1 – Jan 30, 2024</span>
          <button style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 4, padding: "5px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
            ↓ Export
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "8px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginRight: 4 }}>Filters</span>
        <MultiSelect label="Platform" options={allPlatforms} value={platforms} onChange={setPlatforms} />
        <MultiSelect label="Campaign" options={allCampaigns} value={campaigns} onChange={setCampaigns} />
        <MultiSelect label="Device" options={allDevices} value={devices} onChange={setDevices} />
        <MultiSelect label="Region" options={allRegions} value={regions} onChange={setRegions} />
        {(platforms.length + campaigns.length + devices.length + regions.length) > 0 && (
          <button onClick={() => { setPlatforms([]); setCampaigns([]); setDevices([]); setRegions([]); }}
            style={{ fontSize: 11, color: "#6b7280", background: "none", border: "1px solid #e5e7eb", borderRadius: 4, padding: "4px 10px", cursor: "pointer" }}>
            ✕ Clear
          </button>
        )}
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#6b7280" }}>
          <span style={{ fontWeight: 600, color: "#374151" }}>{filteredData.length}</span> records
        </div>
      </div>

      {/* MAIN */}
      <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* KPI ROW */}
        <div style={{ display: "flex", gap: 10 }}>
          <KpiCard label="Total Spend" value={fmt(kpis.spend)} sub={`${fmtN(kpis.impressions)} impr.`} delta={4.2} color="#3b82f6" />
          <KpiCard label="Total Revenue" value={fmt(kpis.revenue)} sub={`${kpis.conversions.toLocaleString()} conv.`} delta={8.1} color="#10b981" />
          <KpiCard label="Total Clicks" value={fmtN(kpis.clicks)} sub="Paid traffic" delta={3.5} color="#6366f1" />
          <KpiCard label="CTR" value={fmtPct(kpis.ctr)} sub="Avg click-through" delta={-0.8} color="#f59e0b" />
          <KpiCard label="ROAS" value={`${kpis.roas.toFixed(2)}x`} sub="Return on ad spend" delta={2.3} color="#8b5cf6" />
          <KpiCard label="CPA" value={fmt(kpis.cpa)} sub="Cost per acquisition" delta={-5.1} color="#ef4444" />
        </div>

        {/* CHARTS ROW 1 */}
        <div style={{ display: "flex", gap: 14 }}>
          {/* Spend vs Revenue */}
          <div style={{ flex: 1.4, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "12px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Spend vs Revenue by Date</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={spendRevenueChart} margin={{ top: 2, right: 10, left: -10, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                <Bar dataKey="spend" name="Spend" fill="#93c5fd" radius={[2, 2, 0, 0]} />
                <Bar dataKey="revenue" name="Revenue" fill="#1d4ed8" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ROAS Trend */}
          <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "12px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>ROAS Trend Over Time</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={roasTrend} margin={{ top: 2, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={v => `${v}x`} domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="ROAS" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: "#8b5cf6" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHARTS ROW 2 */}
        <div style={{ display: "flex", gap: 14 }}>
          {/* Campaign Table */}
          <div style={{ flex: 2, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "12px 16px", overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Campaign Performance</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {["Campaign", "Platform", "Spend", "Revenue", "ROAS", "CPA"].map(h => (
                      <th key={h} style={{ padding: "6px 8px", textAlign: h === "Campaign" || h === "Platform" ? "left" : "right", color: "#6b7280", fontWeight: 600, whiteSpace: "nowrap", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaignTable.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f9fafb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "7px 8px", color: "#111827", fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.campaign.replace(/_/g, " ")}</td>
                      <td style={{ padding: "7px 8px" }}>
                        <span style={{ background: PLATFORM_SOFT[row.platform], color: PLATFORM_COLORS[row.platform], borderRadius: 3, padding: "2px 6px", fontWeight: 700, fontSize: 10 }}>{row.platform}</span>
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right", color: "#374151" }}>{fmt(row.spend)}</td>
                      <td style={{ padding: "7px 8px", textAlign: "right", color: "#374151", fontWeight: 600 }}>{fmt(row.revenue)}</td>
                      <td style={{ padding: "7px 8px", textAlign: "right" }}>
                        <span style={{ color: row.roas >= 4 ? "#059669" : row.roas >= 2.5 ? "#d97706" : "#dc2626", fontWeight: 700 }}>{row.roas.toFixed(2)}x</span>
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right", color: "#374151" }}>{fmt(row.cpa)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Donut + Insights */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Spend Distribution */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "12px 16px", flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Spend by Platform</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={platformDist} cx="50%" cy="50%" innerRadius={36} outerRadius={52} dataKey="value" strokeWidth={0}>
                      {platformDist.map((entry) => (
                        <Cell key={entry.name} fill={PLATFORM_COLORS[entry.name] || "#94a3b8"} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {platformDist.map(p => {
                    const total = platformDist.reduce((s, d) => s + d.value, 0);
                    const pct = total > 0 ? (p.value / total * 100).toFixed(1) : 0;
                    return (
                      <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: PLATFORM_COLORS[p.name], flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: "#374151", flex: 1 }}>{p.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "12px 16px", flex: 1.2 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>AI Insights</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {insights.map((ins, i) => (
                  <div key={i} style={{ background: ins.bg, borderLeft: `3px solid ${ins.color}`, borderRadius: "0 4px 4px 0", padding: "6px 10px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 13 }}>{ins.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: ins.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>{ins.label}</div>
                      <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.4 }}>{ins.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



