import './App.css';
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import OurLogo from './Untitled_Artwork 3.png'

let onSearch;

function Finder({setUniversities}) {
  const containerStyle = {
    width: '858px',
    height: '813px'
  };
  const center = {
    lat: -89.7431,
    lng: 30.2672
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAYEZQoLZdelsJVXBc8YsQZMhhyaliFwHQ"
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map)=>{
    console.log("Loaded")
    PlaceSearch(map,setUniversities);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map)=>{
    setMap(null);
  }, []);

  const OnSubmit=(e)=>{
    console.log("submitting");
    onSearch(e);
  };
  return isLoaded ? (
    <div>
      <form onSubmit={OnSubmit} className="absolute w-[858px] h-[62px] top-[1946px] left-[291px] bg-white border border-solid border-[#1b1f3b]">
        <input name="address" placeholder="Search" className="absolute h-[45px] top-[6px] left-[66px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3bb5] text-[30px] text-center tracking-[0] leading-[normal]"/>
        <button type="submit" >
        <svg
          className="!absolute !w-[62px] !h-[59px] !top-0 !-left-px"
          fill="none"
          height="60"
          viewBox="0 0 62 60"
          width="62"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="28.4168" cy="27.1052" rx="18.0833" ry="17.2487" stroke="#8884FF" strokeWidth="2" />
          <path
            d="M28.4165 19.7128C27.3988 19.7128 26.391 19.904 25.4507 20.2755C24.5104 20.647 23.6561 21.1915 22.9364 21.8779C22.2168 22.5644 21.6459 23.3793 21.2564 24.2762C20.867 25.173 20.6665 26.1343 20.6665 27.1051"
            stroke="#8884FF"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path d="M51.6665 49.2821L43.9165 41.8898" stroke="#8884FF" strokeLinecap="round" strokeWidth="2" />
        </svg>
        </button>
      </form>
      <div className="absolute w-[858px] h-[813px] top-[2022px] left-[291px]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center= {{ lat: 31.9686, lng: -99.9018 }}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </div>
    </div>
  ) : <></>
}


async function PlaceSearch(map,setUniversities){
  const {Geocoder}=await window.google.maps.importLibrary("geocoding");
  
  const geocoder = new Geocoder();
  console.log("search done");
  onSearch=(e)=>{
    console.log("searching...")
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson=Object.fromEntries(formData.entries());
    let address=formJson.address;
    let lat=0.0,lon=0.0;
    console.log(address);
    geocoder.geocode({
      'address': address
    }, (results, status)=>{
      if (status === window.google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();

        let getClosest=(list)=>{
          console.log(list);
        };
        fetch("http://localhost:890/get_sorted_universities/"+lon.toFixed(20)+"/"+lat.toFixed(20)).then((response)=>{
          console.log(response);
          return response.json();
        }).then((response)=>{
          console.log(response.arr);
          setUniversities(response.arr);
          for(let uni of response.arr){
            console.log("uni", uni);
            console.log(new window.google.maps.Marker({position:{lng:parseFloat(uni.coordinates.longitude),lat:parseFloat(uni.coordinates.latitude)},map,title:uni.name}));
          }
        }).catch((reason)=>console.log(reason));
        console.log(lon,lat);
      }
    });
    
  };
}

function Unis({top,name,uniPic,distance,address,website,cost,rank,pictue}){
  let c="absolute w-[1219px] h-[268px] top-["+top+"] left-[83px]";
  return (
    <div className={c}>
          <div className="absolute w-[1219px] h-[267px] top-0 left-0 bg-white shadow-[0px_4px_4px_3px_#00000040]" />
          <img
            className="absolute w-[471px] h-[267px] top-0 left-0 object-cover"
            alt="Element UE"
            src={pictue}
          />
          <img
            className="left-[280px] absolute w-[388px] h-[268px] top-0"
            alt="Polygon"
            src="https://c.animaapp.com/C40MbIbh/img/polygon-1.svg"
          />
          <img
            className="absolute w-[217px] h-[191px] top-[44px] left-[503px]"
            alt="University of st"
            src={uniPic}
          />
          <div className="absolute h-[96px] top-[91px] left-[404px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[80px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            {rank}
          </div>
          <div className="absolute h-[53px] top-[16px] left-[759px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[35px] text-center tracking-[0] leading-[normal]">
            {name}
          </div>
          <div className="h-[174px] top-[75px] left-[759px] flex flex-col items-start gap-[8px] absolute w-[448px]">
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Distance: {distance}
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Address:&nbsp;&nbsp;{address}
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Annual Cost:&nbsp;&nbsp;{cost}
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Website: {website}
              </span>
            </p>
          </div>
        </div>
  );
}

function TopFive({universities}){
  if(universities.length<5)
    return <></>;

  universities.push(0);
  let tops=["3042px","3324px","3608px","3891px","4174px","4647px"];
  let out=[];

  let a=(
    <div>
      <div className="top-[3042px]"></div>
      <div className="top-[3324px]"></div>
      <div className="top-[3608px]"></div>
      <div className="top-[3891px]"></div>
      <div className="top-[4174px]"></div>
    </div>
  );

  for(let i =0;i<5;i++){
    let university=universities[i];
    console.log(university);
    if(university!==undefined){
    console.log(tops[i]);
    let a=i+1;
    out.push(
      <Unis
        top={tops[i]}
        name={university.name}
        uniPic={university.logo}
        distance={university.distance}
        address={university.address}
        website={university.website_url}
        cost={university.tuition}
        rank={'#'+a}
        pictue={university.picture}
      />
    );
    }
    else out.push(<></>);
  }
  return (
    <>
      <div className="absolute h-[84px] top-[2908px] left-[83px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[70px] tracking-[0] leading-[normal] whitespace-nowrap">
        Colleges/University:
      </div>
      {out[0]}
      {out[1]}
      {out[2]}
      {out[3]}
      {out[4]}
    </>
  )
}

function App() {
  let [universities,setUniversities]=useState([]);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[6665px] relative">
        <div className="absolute w-[1440px] h-[344px] top-0 left-0">
          <img
            className="absolute w-[1440px] h-[338px] top-0 left-0"
            alt="Laura paez"
            src="https://c.animaapp.com/C40MbIbh/img/laura-paez-odgoc0vzdl0-unsplash-1.png"
          />
          <div className="absolute w-[1440px] h-[344px] top-0 left-0 bg-[#1b1f3bd4] shadow-[0px_4px_4px_#00000040]" />
          <p className="absolute h-[75px] top-[202px] left-[110px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#fde2ff] text-[50px] text-center tracking-[0] leading-[normal]">
            Because Diversity Shouldn’t be Hard to Find
          </p>
          <div className="absolute w-[959px] h-[143px] top-[59px] left-[47px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#8884ff] text-[140px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            DEItectives
          </div>
        </div>
        <div className="absolute w-[509px] h-[517px] top-[523px] left-[83px]">
          <div className="absolute h-[30px] top-[487px] left-0 [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] text-center tracking-[0] leading-[normal]">
            Source: Houston Public Media
          </div>
          <img
            className="absolute w-[509px] h-[488px] top-0 left-0 object-cover"
            alt="Ap wide"
            src="https://c.animaapp.com/C40MbIbh/img/ap-101296042037-wide-f9423bd59a35d3368c77c42e25c0f86e8d56972c-12.png"
          />
        </div>
        <div className="absolute h-[84px] top-[415px] left-[83px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[70px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
          Context
        </div>
        <div className="absolute w-[1454px] h-[774px] top-[1149px] left-[-13px]">
          <img
            className="absolute w-[1440px] h-[590px] top-0 left-[13px] object-cover"
            alt="Yoksel zok"
            src="https://c.animaapp.com/C40MbIbh/img/yoksel-zok-3ly2znuybfo-unsplash-1.png"
          />
          <div className="absolute w-[1453px] h-[681px] top-[9px] left-0 rotate-[-179.92deg] [background:linear-gradient(180deg,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute w-[1440px] h-[681px] top-0 left-[13px] [background:linear-gradient(180deg,rgba(136,132,255,0.64)_0%,rgba(136,132,255,0.45)_67.19%,rgba(136,132,255,0)_100%)]" />
          <div className="absolute h-[84px] top-[33px] left-[96px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[70px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Impact
          </div>
          <div className="h-[84px] top-[33px] left-[720px] text-[70px] absolute [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            {""}
          </div>
          <p className="absolute w-[1219px] h-[465px] top-[139px] left-[96px] [font-family:'Alike',Helvetica] font-normal text-black text-[25px] tracking-[-0.12px] leading-[normal]">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DEI programs are dedicated to fostering a
            diverse, accepting, and safe student body. Campuses with existing DEI programs have student bodies with
            better mental health and lower rates of suicide and hate crimes. With these programs gone, we predict to see
            an increase in the prevalence of white supremacist literature, racism, and rates of suicide. SB17 will
            disproportionately affect students of historically disadvantaged backgrounds and act as a barrier to
            accessing higher education. We fundamentally believe everyone, regardless of identity or political
            affiliation, should have the opportunity to pursue a form of higher education. <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here’s where DEIscovery comes in. Through our
            finder function, we match prospective and current college students with DEI programs closest to them. While
            DEI programs are free to all students, the annual cost of each institution is included on the results page
            so future or transferring college students can make an educated decision on whether or not they want to
            apply for admission. We recognize not everyone may have the financial or physical means to access external
            DEI programs, so included at the bottom of the page is a series of online, free DEI resources anyone can
            use.
          </p>
          <div className="absolute h-[84px] top-[690px] left-[96px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[70px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Finder:
          </div>
        </div>
        <p className="absolute w-[692px] h-[496px] top-[525px] left-[622px] [font-family:'Alike',Helvetica] font-normal text-black text-[25px] tracking-[-0.12px] leading-[normal]">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; On June 15, 2023, Texas Governor Greg Abbott
          signed Senate Bill 17 (SB17), eliminating Diversity, Equity, and Inclusion (DEI) programs from all higher
          education campuses across Texas. The bill goes into effect on January 1, 2024, and every public
          college/university in Texas with a DEI program will face legal action from the state. Schools have already
          begun removing DEI programs from their campuses, such as the University of Houston, which shut down its DEI
          office on August 24, 2023.
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; However, because Texas only has legal control
          over public schools, private universities like Rice have begun opening their DEI offices to outside students.
          Other private universities across Texas have followed suit, and we predict this trend to increase as January
          approaches.
        </p>
        
          <Finder setUniversities={setUniversities}/>
          
        <div className="absolute w-[1440px] h-[526px] top-[6139px] left-0 [background:linear-gradient(180deg,rgba(217,217,217,0)_0%,rgb(27,31,59)_19.79%)]">
          <div className="absolute w-[959px] h-[143px] top-[223px] left-[145px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#8884ff] text-[140px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            DEItectives
          </div>
          <p className="absolute h-[75px] top-[385px] left-[351px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#fde2ff] text-[50px] text-center tracking-[0] leading-[normal]">
            DEI Offices Unite, Students Ignite
          </p>
        </div>
        <div className="absolute h-[84px] top-[5580px] left-[83px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[70px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
          External Resources:
        </div>
        <p className="absolute w-[1219px] top-[5698px] left-[83px] [font-family:'Alike',Helvetica] font-normal text-black text-[30px] tracking-[-0.15px] leading-[normal]">
          <a href="https://hr.mit.edu/diversity-equity-inclusion/resources">MIT DEI</a>
          <br />
          <a href="https://achievingthedream.org/">Achieving The Dream</a>
          <br />
          <a href="https://www.thetrevorproject.org/">The Trevor Project</a>
          <br />
          <a href="https://www.washington.edu/doit/programs/promising-practices/all">Disability Accesibility</a>
          <br />
          <a href="https://www.nitrocollege.com/scholarships/lgbtq">45 LGBTQ+ Scholrships</a>
          <br />
          <a href="https://www.purdueglobal.edu/blog/student-life/scholarships-minority-students/">50+ College Scholarships for Miniority Students</a>
          
          <br />
          <a href="https://www.aacap.org/AACAP/Families_and_Youth/Resource_Libraries/AAPI_Resources.aspx">Asian American &amp; Pacific Islander Resources</a>
          
        </p>
        
        <div className="absolute h-[84px] top-[4511px] left-[83px] [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-[70px] tracking-[0] leading-[normal] whitespace-nowrap">
          Upcoming Events:
        </div>
        
        <TopFive universities={universities}/>
        
        <div className="absolute w-[1220px] h-[833px] top-[4647px] left-[83px]">
          <div className="absolute w-[1219px] h-[267px] top-0 left-0 bg-white shadow-[0px_4px_4px_3px_#00000040]" />
          <div className="absolute w-[1219px] h-[267px] top-[283px] left-0 bg-white shadow-[0px_4px_4px_3px_#00000040]" />
          <div className="absolute w-[1219px] h-[267px] top-[566px] left-0 bg-white shadow-[0px_4px_4px_3px_#00000040]" />
          <img
            className="absolute w-[388px] h-[267px] top-[283px] left-[831px] object-cover"
            alt="Jason goodman"
            src="https://c.animaapp.com/C40MbIbh/img/jason-goodman-vbxyfxlgpjm-unsplash-1@2x.png"
          />
          <img
            className="absolute w-[410px] h-[267px] top-0 left-[809px] object-cover"
            alt="Headway"
            src="https://c.animaapp.com/C40MbIbh/img/headway-5qgiuubxkwm-unsplash-1@2x.png"
          />
          <div className="absolute w-[154px] h-[267px] top-0 left-[759px] [background:linear-gradient(180deg,rgb(255,255,255)_30.21%,rgba(255,255,255,0)_61.46%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute w-[154px] h-[267px] top-[283px] left-[759px] [background:linear-gradient(180deg,rgb(255,255,255)_30.21%,rgba(255,255,255,0)_61.46%,rgba(255,255,255,0)_100%)]" />
          <img
            className="absolute w-[390px] h-[267px] top-[566px] left-[830px] object-cover"
            alt="Giorgio trovato"
            src="https://c.animaapp.com/C40MbIbh/img/giorgio-trovato-wyxqqpyfnk8-unsplash-1@2x.png"
          />
          <div className="absolute w-[154px] h-[267px] top-[566px] left-[759px] [background:linear-gradient(180deg,rgb(255,255,255)_30.21%,rgba(255,255,255,0)_61.46%,rgba(255,255,255,0)_100%)]" />
          <div className="h-[96px] top-[85px] left-[34px] text-[80px] absolute [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            #1
          </div>
          <div className="h-[136px] top-[117px] left-[389px] flex flex-col items-start gap-[8px] absolute w-[448px]">
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Address:&nbsp;&nbsp;2515 Speedway, Austin, TX 78712
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Website: https://devrev.ai/
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Description: Address biases, broaden perspectives, drive progress!
              </span>
            </p>
          </div>
          <div className="h-[96px] top-[375px] left-[34px] text-[80px] absolute [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            #2
          </div>
          <div className="absolute h-[53px] top-[300px] left-[389px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[35px] tracking-[0] leading-[normal]">
            Procore Diversity Training
          </div>
          <p className="absolute h-[106px] top-[11px] left-[389px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[35px] tracking-[0] leading-[normal]">
            DevRev Diversity in CS <br />
            Workshop
          </p>
          <div className="h-[174px] top-[360px] left-[389px] flex flex-col items-start gap-[8px] absolute w-[448px]">
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Distance:
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Address: 2800 S University Dr, Fort Worth, TX 76109
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Website: https://www.procore.com/virtual-training
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Description:&nbsp;&nbsp;Learn how to bring diversity into your workplace!
              </span>
            </p>
          </div>
          <div className="h-[96px] top-[655px] left-[34px] text-[80px] absolute [font-family:'Keep_Calm-Regular',Helvetica] font-normal text-[#1b1f3b] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            #3
          </div>
          <div className="absolute w-[489px] h-[53px] top-[582px] left-[389px] [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[35px] tracking-[0] leading-[normal]">
            Personal Finance Training
          </div>
          <img
            className="absolute w-[206px] h-[188px] top-[600px] left-[158px]"
            alt="Capital one logo"
            src="https://c.animaapp.com/C40MbIbh/img/capital-one-logo-2@2x.png"
          />
          <div className="h-[174px] top-[642px] left-[389px] flex flex-col items-start gap-[8px] absolute w-[448px]">
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Distance:
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Address: 2800 S University Dr, Fort Worth, TX 76109
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Website: https://www.capitalone.com/
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0] leading-[normal]">
              <span className="[font-family:'Reem_Kufi_Fun',Helvetica] font-normal text-[#1b1f3b] text-[20px] tracking-[0]">
                Description: Learn how to best manage your finances in college with Capital One!
              </span>
            </p>
          </div>
          <img
            className="absolute w-[212px] h-[186px] top-[37px] left-[140px]"
            alt="Devrev logo"
            src="https://c.animaapp.com/C40MbIbh/img/devrev-logo-2@2x.png"
          />
          <img
            className="absolute w-[292px] h-[305px] top-[265px] left-[115px]"
            alt="Img"
            src="https://c.animaapp.com/C40MbIbh/img/629a3a6c3e59ee069da94c70-2@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default App;