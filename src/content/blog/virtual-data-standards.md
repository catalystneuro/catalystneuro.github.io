---
title: "Virtual Data Standards: A New Path Forward for Scientific Data"
date: "2025-12-19"
description: "Scientific data standardization is at a crossroads. This article presents virtual datasets as a third way to make data accessible across programming languages and computing environments while preserving original files."
image: "/images/blog/virtual-data-standards-banner.png"
readTime: "15 min read"
author: "Benjamin Dichter"
keywords: ["NWB", "Zarr", "data standardization", "virtual datasets", "Kerchunk", "LINDI", "neurophysiology", "cloud computing"]
---

Scientific data standardization is at a crossroads. As experiments generate increasingly complex and diverse data, researchers face a critical choice: convert everything to standard formats, or build programmatic interfaces to standardize read patterns for these data types. Both approaches have significant drawbacks. This article presents a third way: virtual datasets, which make data accessible across programming languages and computing environments while preserving original files.

## The need for data standardization in science

Scientific data standardization is fundamental to modern research. As experiments and instruments grow more sophisticated, they generate increasingly complex and voluminous data. Without standardization, valuable research data remains siloed in proprietary formats, trapped on specific types of computers, or accessible only through particular software tools. This fragmentation impedes collaboration, complicates reproducibility, and ultimately slows scientific progress. When researchers can't easily share and access each other's data, they waste time on data conversion and format issues rather than scientific discovery. Moreover, as scientific workflows increasingly leverage cloud computing and artificial intelligence, the need for standardized, performant, and machine-readable data formats becomes even more critical.

The field of neurophysiology exemplifies these challenges. Consider a typical modern neuroscience lab: they might use Neuropixels probes for electrophysiology, microscopes for calcium imaging, and high-speed cameras for behavioral recording. Each instrument comes with its own proprietary software and data formats. The Neuropixels data might be saved in a custom binary format with a separate metadata file, the calcium imaging data in a proprietary microscope format, the behavioral data as a series of video files in various encodings, and the experiment records could be on physical or electronic lab notebooks, or excel files. They likely also have a backlog of data in a variety of other formats.

When researchers try to share this data or reproduce analyses, they face numerous obstacles:

- Proprietary formats that require specific software licenses to access
- Raw binary files with undocumented structures
- Missing or inconsistent metadata about experimental conditions
- Data spread across multiple files with unclear relationships
- Format-specific tools that only work on certain operating systems
- Complex data dependencies that make cloud computing difficult

These challenges become even more acute when attempting to combine data across labs or perform large-scale meta-analyses. For instance, a researcher might want to compare neural responses across different studies, but find that each dataset uses different conventions for marking experimental events, different units for neural signals, and different coordinate systems for electrode positions. What should be a straightforward scientific comparison becomes a complex data engineering project.

In the world of scientific data management, we face a fundamental choice in how we approach standardization: Should we standardize the data format itself, or should we standardize the interface (API) through which we access the data? Both approaches have significant trade-offs that deserve careful consideration.

## The Format Standardization Approach

Converting data to a standard format is perhaps the most straightforward approach to standardization. In principle, once data is converted to a common format, any person or any tool that understands this format can work with the data. This approach offers crucial advantages when dealing with problematic data formats: it can resolve issues with inefficient storage structures, augment deficient metadata, and most importantly, liberate data from proprietary software or specific computing environments. This liberation from vendor lock-in and platform dependence is particularly valuable in scientific research, where long-term accessibility and reproducibility are essential. Moreover, integration with modern storage backends like HDF5 and Zarr enable optimization of data storage for use in modern compute environments, including the cloud.

In neuroscience, two major data standardization efforts exemplify this approach: Neurodata Without Borders (NWB) and Brain Imaging Data Structure (BIDS). NWB uses HDF5 or Zarr to store neuroscience data in easy-to-use files with a comprehensive schema for everything from electrode recordings to optical imaging. BIDS takes a different approach, standardizing file organization and metadata while maintaining raw data in common neuroimaging formats. Importantly, this approach is only viable because the neuroimaging community has already undertaken extensive efforts to standardize raw data via DICOM for medical imaging and NIfTI for neuroimaging data standards. Both BIDS and NWB have gained significant adoption in their respective communities, demonstrating the value of format standardization.

However, this approach still comes with substantial practical challenges. For example, NWB users must convert their data to HDF5 or Zarr. These requirements can create significant overhead for labs, especially when dealing with ongoing experiments or legacy data. The conversion process can be resource-intensive, requiring significant computational power, storage, and time, especially when dealing with large datasets. These environmental and computational costs are incurred every time new data needs to be standardized, and may also need to be repeated if the standard changes.

As BIDS expands to handle data in new subdomains, the BIDS community must carefully consider support for each new additional format. Format accessibility and performance need to be considered, and each individual data format increases the burden of tools that want to read BIDS data.

Storage requirements present another challenge. While maintaining data in a standard format should theoretically eliminate the need for the original files, practical considerations often necessitate keeping both versions. Scientists may need to preserve original data for verification or to address concerns about potential loss of information during conversion. They may also have analysis tools that require the legacy format. This effectively doubles the storage requirements, a significant concern when dealing with the increasingly large datasets common in modern research.

Perhaps most critically, format conversion risks losing essential metadata or subtle aspects of the data that weren't anticipated in the standard format's design. Even with carefully designed standards, it's challenging to ensure that all relevant information is properly captured and translated.

## The API Standardization Approach

Given these challenges, it may be appealing to pursue an alternative: standardizing the API rather than the data format. This approach allows data to remain in its native format while providing a unified interface for accessing it. At first glance, this seems to solve the resource utilization and potential loss of information problems of format standardization.

The neuroscience community has seen several notable projects that follow the ethos of API standardization. The Neo project has been a leader in this approach for electrophysiology data, providing a Python API that can read many proprietary and open formats into a common object model. This allows analysis code to work with data regardless of its source format, as long as Neo supports reading that format. The International Brain Lab (IBL) took a similar approach with their Open Neurophysiology Environment (ONE), creating a standardized API for accessing neurophysiology data that abstracts away the underlying storage details. More recently, the Neuroscience Data Interface (NDI) project has created a comprehensive API for accessing and analyzing neurophysiology data in MATLAB, incorporating lessons learned from previous efforts.

A key advantage of the API approach is that it doesn't require conversion of the data, preserving the data in its original form and avoiding both the cost of data conversion and the possibility of losing essential metadata. Even if the standardized API doesn't explicitly support certain metadata fields, this information remains accessible in the source files through custom access methods. This can be valuable in experimental science, where seemingly minor metadata might later prove crucial for analysis or reproducibility.

However, API standardization introduces several significant limitations. First and foremost is programming language lock-in. When you standardize at the API level, you inevitably tie yourself to a specific programming language ecosystem. For instance, Neo's Python-based API is elegant and efficient, but creates barriers for researchers who work in MATLAB, Julia, R, or other languages. The IBL's ONE protocol, and NDI, while well-designed, face similar language constraints. Supporting a new programming language isn't just a matter of creating language bindings – it often would require completely reimplementing the interfaces for each supported data format from scratch. While there are tools for bridging between programming languages, these solutions are often unreliable or unavailable, and introduce their own complexities. This represents a significant duplication of effort and increases the maintenance burden for the scientific community. This language barrier effectively fragments the research community along technological lines. Language lock-in can significantly delay the adoption of new technological advances.

Critically, the API approach doesn't address fundamental limitations of the source data formats themselves. If the original data is stored inefficiently, an API can't magically make it more efficient. If the data requires proprietary software or specific computing environments to be read (such as Windows-specific DLLs), the API approach simply inherits these limitations, in the worst case, creating a standardized interface on top of a potentially unstable or restrictive foundation.

Another key limitation of the API approach is the inability to add metadata. This approach requires that metadata necessary to read and understand the data is present or can be inferred, which is not always the case.

## Bridging the Gap in Data Standardization through Virtual Datasets

The challenges with both format and API standardization point to the need for a fundamentally different approach. Instead of converting data or building language-specific APIs, we can create standardized "maps" of data files that preserve original data while providing universal access across programming languages and computing environments. Rather than converting data or building format-specific readers, this virtual data approach creates detailed JSON descriptions that both explain how to read data and how to map them to corresponding fields into a data standard schema. These descriptions serve as a bridge between original data files and modern data standards, working with any programming language that can read these maps and making data easily accessible to analysis tools. By schematizing this map, we can enforce regularity in the expression of the data and metadata necessary for reading, understanding, and analyzing it.

Beyond resolving the shortcomings of the more traditional approaches, the separation of data description from the data itself has additional benefits: it enables dynamic updating of metadata, creation of explicit provenance links, and sophisticated combinations of data from different sources - all without modifying the original files.

Motivated by these numerous advantages, the Neurodata Without Borders (NWB) team has started to integrate the virtual dataset approach into the NWB data standard and software ecosystem. We outline our approach below, in which we collaborate with an analogous effort in the geosciences and adapt these tools to handle neuroscience-specific challenges.

## Creating Virtual Data Maps

The virtualized datasets are formally described using the Zarr specification, which is a cross-domain effort to efficiently handle large and complex multi-dimensional data arrays. The Zarr specification provides data annotations such as data type, shape of the data, chunking, and any applied filters or compression algorithms, providing a map for how to read it.

The geosciences community discovered this idea before us, and have developed Kerchunk and VirtualiZarr, two libraries that enable the creation of these maps. When working with HDF5 files (common in neuroscience), Kerchunk creates JSON maps using the Zarr annotation without copying or moving any of the large datasets. The data is now expressed as Zarr with pointers to the original data, and can be read using Zarr libraries, which have been developed for cloud compute applications. Labs can continue using their existing files while gaining the benefits of modern, cloud-native data access patterns.

The approach handles different scales of data elegantly. Small but crucial metadata - like channel labels, sampling rate, or experimental parameters - can be stored directly in the JSON file. For larger datasets, JSON provides precise instructions for efficient access to the original files. This flexibility optimizes both performance and convenience while maintaining data integrity.

## Integrating with existing standards and interfaces

The mapping layer can provide more than instructions how to read the data- it can provide semantic context that is essential for the data to be truly useful. For example, by mapping existing data to corresponding fields in data standard schema virtual datasets allow us to describe existing data in a form that is compliant with data standards, such as NWB.

Another useful structure is Xarray, which provides a standard API for representing raw numerical arrays as meaningful scientific data by adding dimensional labels, units, and metadata. This integration fits naturally with our virtual dataset approach – the semantic information can be stored directly in the JSON descriptions, creating complete, self-describing datasets.

In neurophysiology, data annotation is particularly powerful. An electrode recording becomes more than just a matrix of numbers when we can label its dimensions as 'time' and 'channel', specify units like 'seconds' and 'microvolts', and attach metadata about sampling rates and electrode positions. Similarly, behavioral tracking data gains clarity when dimensions are labeled as 'frame', 'x', and 'y', with proper spatial units and precise timestamps. The result is a system that combines efficient data access with rich semantic context, enabling sophisticated analyses like selecting data by physical coordinates, automatic alignment of different datasets, and unit-aware computations.

A nice feature of this approach is that you can map the same underlying source data to multiple different mappings, which might be useful for different applications. This would allow you to provide, for example, one NWB layout and another Xarray layout, both pointing to the same underlying data source. You could also easily create new maps that follow data standards as they evolve, so you could adhere to new versions of the NWB schema without needing to duplicate the underlying data.

These maps build a data structure that adheres to the NWB schema while pointing to source data. That source data may (and often is) itself in NWB, in which case the maps provide the benefit of separating the metadata from the data, which can be useful in cloud computing. The source data could also be in a variety of compliant non-NWB source formats, in which case this strategy allows you to side-step the costly conversion step entirely.

## Virtual Dataset Implementation in Kerchunk

Kerchunk maps existing data files to the Zarr specification through JSON reference files. These references specify the precise location and structure of data chunks, enabling Zarr-compatible tools to access the original data without conversion. The JSON references contain essential information about array structure, data types, and the location of the underlying bytes in the source files.

Virtual Zarr datasets use a single JSON file, and create references via "refs". If these refs are dictionaries, they are treated as files. Our first ref is creating a virtual file called ".zgroup" which uses JSON to specify that we are using Zarr format 2.

```json
{
    "version": 1,
    "refs": {
        ".zgroup": {"zarr_format": 2}
    }
}
```

### Basic Datasets

Datasets are specified using .zarray, .zattrs, and chunk references.

```json
{
    "version": 1,
    "refs": {
        ".zgroup": {"zarr_format": 2},
        "ap_band/.zarray": {
            "shape": [18000000, 384],
            "dtype": "<i2",
            "compression": null,
            "chunks": [18000000, 384]
        },
        "ap_band/.zattrs": {
            "_ARRAY_DIMENSIONS": ["time", "channel"],
            "units": "uV",
            "scale_factor": 2.34375
        },
        "ap_band/0": ["recording.ap.bin", 0, 13824000000]
    }
}
```

`.zarray` defines the array with shape and data type. Zarr arrays are required to be chunked, so if you have one contiguous array, you would specify this as one big chunk. This is common for electrophysiology data, such as SpikeGLX and Intan. In this case, we have int16 data of size [18000000, 384].

`.attrs` can be used to provide attributes for the array in JSON form. This allows you to annotate and contextualize the data. `"_ARRAY_DIMENSIONS"` is a special attribute that is automatically parsed by Xarray.

Finally, we have a list of chunk references. In this case, since there is only one chunk, there is only one chunk reference, `"ap_band/0"`. This holds a list that contains the relative path of the data (`"recording.ap.bin"`), the offset (0), and the size of the chunk in bytes (13824000000).

### Chunked Datasets

The source data may be chunked. This can happen if you are using a source format that supports chunking, such as HDF5, or if you are combining data from multiple files. Here is an example of combining two image files of data type uint16.

```json
{
    "version": 1,
    "refs": {
        ".zgroup": {"zarr_format": 2},
        "images/.zarray": {
            "shape": [2, 2048, 2048],
            "chunks": [1, 2048, 2048],
            "dtype": "<u2",
            "compression": null
        },
        "images/0.0.0": ["vol_0000.tiff", 8, 8388608],
        "images/1.0.0": ["vol_0001.tiff", 8, 8388608]
    }
}
```

Each takes up one [2048, 2048] chunk. Each of these images contains an 8-byte header, which is ignored by the offset value in `["vol_0000.tiff", 8, 8388608]`. The filename `images/0.0.0` indicates that this is the chunk of images that is at position [0, 0, 0] on the chunk grid.

### Advanced features

The standard supports some more advanced features beyond the scope of this text, e.g.:

- Dataset chunks can use compression and filter algorithms specified in the .zarray.
- Small datasets can be stored directly in the JSON instead of being stored as a reference.
- Map files with many references can use a template language to specify for-loop patterns over references. See Kerchunk V1 documentation for details.

## Practical Applications and Ecosystem Integration

Virtual datasets have enormous potential, and can be integrated into existing data management systems seamlessly and non-destructively. We are currently in the process of integrating virtual datasets across several domains.

### Advanced Data Structures with LINDI

While Kerchunk provides the foundation for virtual datasets, NWB uses links and references, specific features of HDF5 that do not map directly to the Zarr specification. These features are used to define crucial relationships between different measurements - like connecting spike times to their source voltage traces, or linking electrode recordings to their precise spatial positions.

LINked Data Interface (LINDI), developed by Jeremy Magland and Ryan Ly, extends the virtual dataset approach to handle these advanced HDF5 structures, making it possible to create complete mappings of complex scientific data in HDF5 without losing important structural information. By preserving these relationships in our virtual mappings, LINDI enables sophisticated data organization while maintaining the benefits of cloud-native access patterns.

### Visualization and Analysis: Enabling efficient remote and cloud-based data access

The virtual dataset approach is already providing value in real-world applications from efficient cloud access for visualization, integration with NWB and data API's, and extension of data standards. Neurosift, a web-based visualization platform for neurophysiology data built by Jeremy Magland, already demonstrates the practical benefits of this approach. Using Kerchunk and LINDI for efficient, cloud-friendly access to NWB data without specialized HDF5 libraries, Neurosift enables interactive visualizations of complex neurophysiology datasets from the cloud without requiring expensive download of the full datasets.

### API Integration: Facilitating Use of Existing Standard APIs

The virtual dataset approach also complements, rather than replaces, established tools in neuroscience. The rich ecosystem of existing APIs like Neo, NDI, and ONE represents decades of development in sophisticated analysis and data management tools. Since virtual dataset mapping doesn't modify original data files, these APIs can continue to operate alongside it, allowing researchers to use the most appropriate tool for each task. Moreover, these APIs could be enhanced to read virtual dataset descriptions, automatically gaining support for any mapped data format without requiring format-specific implementations. Rather than forcing a choice between approaches, the virtual dataset approach builds bridges between them, making neurophysiology data more accessible while preserving and enhancing the functionality of existing tools.

### Extending Standards: BIDS and Beyond

Virtual datasets could also help expand existing standards like BIDS (Brain Imaging Data Structure) to support new types of data. Instead of requiring format conversion, researchers could provide standardized JSON descriptions alongside traditional metadata files, maintaining familiar organization while enabling standard access patterns. This flexibility could accelerate the adoption of standards while supporting the growing diversity of neuroscience data.

### A virtual dataset ecosystem in the geosciences

This approach has gained traction beyond neurophysiology, with notable adoption in the geospatial data community, where researchers handle massive satellite imagery and climate datasets. VirtualiZarr, inspired by Kerchunk, provides virtualization tools for data formats common in geosciences. IceChunk builds upon (potentially) virtual Zarr datasets and provides database-like transitions and versioning. Arraylake is a data lake platform for managing multidimensional arrays and metadata in the cloud. By using a common virtual dataset descriptor language, we enable interdisciplinary collaboration in data infrastructure development, which will enable neuroscientists to benefit from and contribute to data infrastructure developed in the geosciences and other fields.

## Current Limitations and Future Developments

While the virtual dataset approach solves many data standardization challenges, many of the technologies are still relatively young and some important gaps remain.

### Need for widespread support across programming languages and tools

The approach relies on readers for Kerchunk and Zarr, which are currently primarily available in Python, Julia, and JavaScript. MATLAB, despite its widespread use in neuroscience, currently lacks full support for the Zarr specification. This limitation affects many research labs, particularly those working with electrophysiology and calcium imaging data. Implementing virtual Zarr support in MATLAB would not only enable virtual dataset access but could also improve cloud storage access for MATLAB's own HDF5-based .mat files.

We're also working to extend these capabilities to existing tools. For instance, we're enhancing Neo, a popular Python library for neurophysiology data, to generate virtual datasets. This evolution will allow Neo's deep understanding of various data formats to benefit users across all programming languages, not just Python. Instead of acting as a translator, Neo will serve as a cartographer, creating maps that any software can follow.

### Not all traditional formats can be indexed efficiently

While virtual datasets solve many standardization challenges, some scenarios still require traditional format conversion. For instance, proprietary formats that require specialized software libraries can't be fully described in JSON mappings. The strategy only works on binary data, so text-based files like CSVs and TSVs will need to be converted. Similarly, some legacy formats store data in ways that fundamentally limit performance - like splitting what should be a single array across thousands of small files. In these cases, converting to a modern format like Zarr becomes necessary. Specific applications, like the DANDI Archive, may want data to be chunked and compressed in a way that is optimized for archival storage or cloud computation. The decision to convert should be based on specific technical limitations:

- Incompatibility with Zarr specification
- Reliance on proprietary software for data access
- Inefficient data layout that impacts performance

In practice, the decision to convert or map will depend upon the specifics of the application. This practical hybrid approach - using virtual datasets where possible and converting formats only when necessary - provides the flexibility needed for real-world neurophysiology research.

### Persistence is essential

In practice, remote data sources may be unexpectedly changed or removed. This can be managed either by relying on trusted repositories with persistence guarantees, or by creating a system that jointly manages the source files and the virtual dataset maps, ensuring that the maps are always in sync with the source files.

## Conclusion

The virtual dataset approach offers a pragmatic solution to scientific data standardization by bridging the gap between format conversion and API-based methods. By using Kerchunk and the Zarr specification to create standardized "maps" of data files, it enables universal data access without the overhead of conversion or language-specific dependencies.

While challenges remain, particularly in ecosystem support and tool integration, this hybrid approach points to a future where researchers can focus on scientific discovery rather than data management, and achieve seamless collaboration with their colleagues. By preserving original data formats while enabling modern analysis capabilities, virtual datasets provide a practical path forward for scientific data standardization that balances efficiency, accessibility, and real-world research needs.

## Acknowledgements

I would like to thank Ryan Ly, Oliver Ruebel, and Jeremy Magland, who have all been instrumental in the conceptualization and realization of virtual datasets in neurophysiology, and provided thoughtful edits and comments on this article.

---

## About the Author

<div style="display: flex; align-items: flex-start; gap: 20px; margin-top: 20px;">
<img src="/images/team/benjamin_dichter.png" alt="Ben Dichter" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;" />
<div>

**Ben Dichter, PhD** is the Founder of CatalystNeuro. He received his Ph.D. in Bioengineering from the UC Berkeley – UCSF Joint Program in Bioengineering, in Dr. Edward Chang's lab. There he used electrocorticography (ECoG) to study the neural control of speech in humans. Much of this work focused on how we control the pitch of our voice when we speak and sing. He is now a data scientist consultant for neuroscience labs, focusing on building systems for sharing of data and analyses.

[GitHub](https://github.com/bendichter) • [Twitter](https://twitter.com/bendichter) • [Website](http://bendichter.com) • [ORCID](https://orcid.org/0000-0001-5725-6910)

</div>
</div>
