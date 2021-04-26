import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import { Container, } from "reactstrap"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FaMobile } from 'react-icons/fa';
 import { AiOutlineForm } from 'react-icons/ai';
import { FaPhone } from 'react-icons/fa';

export default function BlogCard(prop) {





    return ( <>





<VerticalTimeline animate = {false}>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
     iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<FaMobile></FaMobile>}
  >
    <h3 className="vertical-timeline-element-title">Help us to get to know you</h3>
     <p>
we will ask a little bit about yourself and your health related issues    </p>
  </VerticalTimelineElement>


  <VerticalTimelineElement
    className="vertical-timeline-element--work"
     iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
         contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
             contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}


    icon={<FaPhone></FaPhone>}
  >
    <h3 className="vertical-timeline-element-title"> Chat and Call</h3>
     <p>

       We will call you and talk about the health condition in detail
    </p>
  </VerticalTimelineElement>


  <VerticalTimelineElement
    className="vertical-timeline-element--work"
             contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
             contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}

     iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
     icon={<AiOutlineForm></AiOutlineForm>}

   >
    <h3 className="vertical-timeline-element-title">Prescription</h3>
     <p>
Get a digital prescription and a free follow-up


    </p>
  </VerticalTimelineElement>
 
</VerticalTimeline>


        </>
    )
}