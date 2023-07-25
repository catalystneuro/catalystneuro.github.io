---
layout: splash
title: "Mission"
permalink: /mission/
collection: mission
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/neuro-mission.png
---

<style>
body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    background-image: url("/assets/images/gradient2update.jpg");
    background-size: cover;
  }
  .mission-content {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
  }
  .mission-content h1 {
    color: #333;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .mission-content h3 {
    color: #555;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .mission-content p {
    color: #666;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .mission-content ul {
    list-style: disc;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .mission-content li {
    font-size: 18px;
    line-height: 1.4;
  }
  .mission-content a {
    color: #007bff;
    text-decoration: none;
  }
  .mission-content a:hover {
    text-decoration: underline;
  }
  .mission-content li:hover {
    background-color: #f9f9f9;
  }
  .mission-content a:hover {
    color: #0056b3;
  }
  .mission-content .image-part {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .mission-content .image-part img {
    border-radius: 5px;
    flex: 0 0 auto;
    margin-right: 20px;
    margin-top: 30px;
    max-width: 27%;
    height: auto;
    object-fit: contain;
    align-self: flex-start;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    float: left;
  }

  .mission-content .image-part .text-container {
    flex: 1;
    padding: 0 20px;
  }

  @media (max-width: 27%) {
    .mission-content .image-part {
      flex-direction: column;
    }

    .mission-content .image-part img {
      margin-bottom: 10px;
      margin-right: 0;
      max-width: 100%;
      float: none;
    }
  }
    @media (max-width: 768px) {
    body {
        background-image: url("/assets/images/gradient2small.jpg");
        background-size: cover;
    }
}
  </style>
<div class="mission-content">
<h1>The Problem</h1>
<p>Acquiring neurophysiology data is expensive and time-consuming, often involving highly skilled individuals and the use of animals. As scientists, it is our duty to ensure that this data is utilized to its maximum potential. We understand that data collected for one project could be used to answer additional scientific queries, but sharing this data can be quite difficult.

      Data can be stored in many different formats, and important metadata required for analysis could be missing or stored in ways that are hard to share. Software developed in labs can also be difficult to distribute, mainly due to the need for converting obscure data formats and a lack of adequate documentation and user-friendly packaging. As a result, labs often collect entirely new data and create new software instead of collaborating.

      This situation has a significant impact on the neuroscience community and hinders scientific progress. Not sharing data leads to wasted time, money, and underuse of animal subjects. It also makes it harder to verify existing studies and to conduct follow-up research. In-depth analyses across multiple labs are very labor-intensive, and the effort put into software development usually only benefits a few researchers.

      A key reason for this issue is that it can be difficult for research labs to devote the necessary time and attention to data and software engineering. Pushing the boundaries of human knowledge requires enormous effort, and most research groups work within a “publish-or-perish” system where labs that focus on looking for the next big scientific findings will supplant labs that divert attention to other things. In addition, until recently, there has not been strong consensus in the field around data standards or processing pipelines.

      The problem has become more urgent recently, with a new NIH policy that all papers must include the publication of scientific data. Now, whether motivated by an appreciation for open science or by funding requirements, many labs are facing new challenges in sharing data. This problem is exacerbated by new data acquisition technologies that are producing data at an unprecedented pace.
</p>
<h1>Our Solution</h1>
  <p>
      CatalystNeuro is a specialized company committed to assisting neuroscience labs navigate this challenging period. Our international team consists of neuroscientist software developers who are deeply passionate about employing data and software engineering to create a seamless network among data producers, tool developers, and users within the neuroscience community. 

      CatalystNeuro is designed to be complementary to labs. We focus on data and software engineering so labs can focus on advancing and communicating scientific discoveries. Despite being a for-profit organization, we adhere to an open-source approach with permissive licensing for our developed software, thereby offering free access to anyone in the community. 

      Presently, our primary areas of focus include data sharing in neurophysiology and spike sorting.
  </p>
  <div class="image-part">
      <img src="/assets/images/neurophys.jpeg" alt="Data Sharing Neurophysiology Image">
      <div class="text-container">
      <h2>Data Sharing in Neurophysiology</h2>
      <p>In collaboration with BRAIN-endorsed teams, we are developing an infrastructure that promotes active cooperation across the neurophysiology community. We utilize the Neurodata Without Borders (NWB) standard for neurophysiology data and work closely with the DANDI Archive, which accepts NWB data and is capable of storing terabytes of neurophysiology data at no charge. As part of the development teams for these projects, we create open-source software to simplify the usage of these tools, including:</p>
      <ul>
        <li>NWB Inspector: A tool that scans NWB files for potential errors and areas of improvement, generating a comprehensive report.</li>
        <li>NeuroConv: A utility that automates the conversion from proprietary neurophysiology data formats to NWB.</li>
        <li>NWB GUIDE: A graphical user interface (GUI) that offers a code-free solution for conversion to NWB (currently in progress).</li>
      </ul>
      <p>We collaborate with individual labs to develop tailored solutions to help them leverage these resources. This includes both virtual and in-person training, and contracts for the development of customized solutions.</p>
      </div>
  </div>
      
  <div class="image-part">
      <div class="text-container">
      <h2>Spike Sorting</h2>
      <p>Spike sorting is the process of identifying neuronal action potentials in an electrophysiology recording and assigning them to different neurons. Spike sorting is a challenging problem that is far from solved, and the recent advances in electrophysiology channel count and density have made the problem much more difficult. SpikeInterface is an open-source software solution that makes it easy to access state-of-the-art spike sorting technology. With a few lines of code, SpikeInterface enables you to load and preprocess an electrophysiology recording, run several state-of-the-art spike sorters, compare them, post-process and curate the output, compute quality metrics, and visualize the results.</p>
      </div>
      <img src="/assets/images/spike-sort.jpeg" alt="Spike Sorting Image">
  </div>
</div>