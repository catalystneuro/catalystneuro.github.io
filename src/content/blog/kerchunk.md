---
title: "Virtual Data Standards: A New Path Forward for Scientific Data"
date: "2024-01-18"
description: "An exploration of different approaches to data standardization in scientific computing, with a focus on the Kerchunk solution for efficient data access"
readTime: "20 min"
image: "/images/blog/kerchunk/kerchunk_image.png"
keywords: [
  "data standardization",
  "scientific computing",
  "kerchunk",
  "zarr",
  "data formats",
  "API design",
  "cloud computing",
  "NWB",
  "BIDS"
]
---

Scientific data standardization is at a crossroads. As experiments generate increasingly complex data, researchers face a critical choice: convert everything to standard formats, or build complex APIs to handle diverse data types. Both approaches have significant drawbacks. This article presents a third way: virtual datasets that make data accessible across programming languages and computing environments while preserving original formats.

# The need for data standardization in science

Scientific data standardization is fundamental to modern research. As experiments and instruments grow more sophisticated, they generate increasingly complex and voluminous data. Without standardization, valuable research data remains siloed in proprietary formats, trapped on specific computers, or accessible only through particular software tools. This fragmentation impedes collaboration, complicates reproducibility, and ultimately slows scientific progress. When researchers can't easily share and access each other's data, they waste time on data conversion and format issues rather than scientific discovery. Moreover, as scientific workflows increasingly leverage cloud computing and artificial intelligence, the need for standardized, machine-readable data formats becomes even more critical.

The field of neurophysiology exemplifies these challenges. Consider a typical modern neuroscience lab: they might use Neuropixels probes for electrophysiology, two-photon microscopes for calcium imaging, and high-speed cameras for behavioral recording. Each instrument comes with its own proprietary software and data formats. The Neuropixels data might be saved in a custom binary format with a separate metadata file, the calcium imaging data in a proprietary microscope format, and the behavioral data as a series of video files in various encodings.
When researchers try to share this data or reproduce analyses, they face numerous obstacles:
* Proprietary formats that require specific software licenses to access
* Raw binary files with undocumented structures
* Missing or inconsistent metadata about experimental conditions
* Data spread across multiple files with unclear relationships
* Format-specific tools that only work on certain operating systems
* Complex data dependencies that make cloud computing difficult

These challenges become even more acute when attempting to combine data across labs or perform large-scale meta-analyses. For instance, a researcher might want to compare neural responses across different studies, but find that each dataset uses different conventions for marking experimental events, different units for neural signals, and different coordinate systems for electrode positions. What should be a straightforward scientific comparison becomes a complex data engineering project.

In the world of scientific data management, we face a fundamental choice in how we approach standardization: Should we standardize the data format itself, or should we standardize the interface (API) through which we access the data? Both approaches have significant trade-offs that deserve careful consideration.

## The Format Standardization Approach

Converting data to a standard format is perhaps the most straightforward approach to standardization. In principle, once data is converted to a common format, any tool that understands this format can work with the data. This approach offers crucial advantages when dealing with problematic data formats: it can resolve issues with inefficient storage structures, augment deficient metadata, and most importantly, liberate data from proprietary software or specific computing environments. This liberation from vendor lock-in and platform dependence is particularly valuable in scientific research, where long-term accessibility and reproducibility are essential.

Moreover, modern storage backends like HDF5 and Zarr provide powerful capabilities that can actually improve data accessibility and efficiency. These formats support features like chunking and compression, enabling sophisticated data engineering techniques that can significantly reduce storage requirements while maintaining data integrity. Such features are particularly valuable in cloud computing environments, where data layout and access patterns can dramatically impact both performance and cost. By converting to these modern formats, we're not just standardizing – we're often optimizing the data for contemporary computing paradigms.

In neuroscience, two major format standardization efforts exemplify this approach: Neurodata Without Borders (NWB) and Brain Imaging Data Structure (BIDS). NWB originally used HDF5 as its storage backend to standardize neurophysiology data, providing a comprehensive schema for everything from electrode recordings to optical imaging. Recently, NWB added support for Zarr as a second backend, recognizing the growing importance of cloud-native storage formats in modern neuroscience workflows. BIDS takes a different approach, standardizing file organization and metadata while maintaining raw data in common neuroimaging formats. Both standards have gained significant adoption in their respective communities, demonstrating the value of format standardization. However, they also illustrate the challenges: NWB users must convert their data to HDF5 or Zarr, while BIDS requires careful organization of files and extensive metadata curation. These requirements can create significant overhead for labs, especially when dealing with ongoing experiments or legacy data.

Importantly, BIDS's approach of standardizing metadata and file organization while preserving raw data formats is only viable because the neuroimaging community had already undertaken extensive format standardization efforts. Formats like DICOM for medical imaging and NiFTI for neuroimaging data are themselves standards, with well-defined specifications for both data and metadata. This prior standardization work means that BIDS can focus on higher-level organization and metadata without needing to address fundamental data format issues. In contrast, many areas of neurophysiology lack such standardized base formats, which is why NWB needs to take a more comprehensive approach that includes standardizing the underlying data format.

However, this approach still comes with substantial practical challenges:

First, the conversion process itself can be resource-intensive. It requires significant computational power and time, especially when dealing with large datasets. This environmental and computational cost isn't just a one-time expense – it's incurred every time new data needs to be standardized, and may also need to be repeated if the standard changes.

Storage requirements present another challenge. While maintaining data in a standard format should theoretically eliminate the need for the original files, practical considerations often necessitate keeping both versions. Scientists may need to preserve original data for verification purposes, or they might worry about potential loss of information during conversion. This effectively doubles the storage requirements, a significant concern when dealing with the increasingly large datasets common in modern research.

Perhaps most critically, format conversion risks losing essential metadata or subtle aspects of the data that weren't anticipated in the standard format's design. Even with carefully designed standards, it's challenging to ensure that all relevant information is properly captured and translated.

## The API Standardization Approach

Given these challenges, it's tempting to pursue an alternative: standardizing the API rather than the data format. This approach allows data to remain in its native format while providing a unified interface for accessing it. At first glance, this seems to solve the resource utilization problems of format standardization.

The neuroscience community has seen several notable attempts at API standardization. The Neo project pioneered this approach for electrophysiology data, providing a Python API that can read various proprietary and open formats into a common object model. This allows analysis code to work with data regardless of its source format, as long as Neo supports reading that format. The International Brain Lab (IBL) took a similar approach with their Open Neurophysiology Environment (ONE), creating a standardized API for accessing neurophysiology data that abstracts away the underlying storage details. More recently, the Neuroscience Data Interface (NDI) project has attempted to create a comprehensive API for accessing and analyzing neurophysiology data, incorporating lessons learned from previous efforts.

One significant advantage of the API approach is its preservation of metadata. Since the original files are maintained in their native format, no metadata is lost during standardization. Even if the standardized API doesn't explicitly support certain metadata fields, this information remains accessible in the source files through custom access methods. This is particularly valuable in experimental science, where seemingly minor metadata might later prove crucial for analysis or reproducibility.

However, API standardization introduces several significant limitations. First and foremost is programming language lock-in. When you standardize at the API level, you inevitably tie yourself to a specific programming language ecosystem. For instance, Neo's Python-based API is elegant and efficient, but creates barriers for researchers who work in MATLAB, Julia, R, or other languages. The IBL's ONE protocol, and NDI, while well-designed, faces similar language constraints. Supporting a new programming language isn't just a matter of creating language bindings – it often requires completely reimplementing the interfaces for each supported data format from scratch. This represents a significant duplication of effort and increases the maintenance burden for the scientific community.

Critically, the API approach doesn't address fundamental limitations of the source data formats themselves. If the original data is stored inefficiently, an API can't magically make it more efficient. If the data requires proprietary software or specific computing environments to be read (such as Windows-specific DLLs), the API approach simply inherits these limitations. You're essentially building a standardized interface on top of a potentially unstable or restrictive foundation.

While there are tools for bridging between programming languages, these solutions are often unreliable or introduce their own complexities. They may work for simple cases but frequently break down when dealing with complex data structures or when performance is critical. This language barrier effectively fragments the research community along technological lines.

This fragmentation has serious implications for scientific progress. When researchers are locked into specific programming environments, it becomes harder to adopt new analytical tools and techniques. Innovation in data analysis often comes from new programming languages or frameworks, and language lock-in can significantly delay the adoption of these advances.

## A Hybrid Solution: The Future of Data Standardization

The challenges with both format and API standardization point to the need for a fundamentally different approach. Instead of converting data or building language-specific APIs, we can create standardized "maps" of data files that preserve original data while providing universal access across programming languages and computing environments.
This approach uses the Zarr format specification as a universal language for describing data organization. Rather than converting data or building format-specific readers, we create detailed JSON descriptions that explain how to read each file. These descriptions serve as a bridge between original data files and modern analysis tools, working with any programming language that can read Zarr.

### Building Better Tools: The Kerchunk Implementation

We're implementing this vision through Kerchunk, adapting and extending it for neurophysiology data. When working with HDF5 files (common in neuroscience), Kerchunk creates JSON maps that liberate the data from the HDF5 ecosystem. Labs can continue using their existing files while gaining the benefits of modern, cloud-native data access patterns.

The approach handles different scales of data elegantly. Small but crucial metadata - like channel labels, timestamps, or experimental parameters - is stored directly in the JSON file. For larger datasets, we provide precise instructions for efficient access to the original files. This flexibility optimizes both performance and convenience while maintaining data integrity.

This hybrid approach enables efficient cloud computing workflows, where researchers can examine metadata and selectively access data chunks without downloading entire files. It works seamlessly with modern analysis tools while preserving original data formats. Early adoption in neuroscience labs demonstrates that teams can maintain their existing workflows while gradually transitioning to more efficient, cloud-native analysis methods without the overhead of data conversion or the limitations of language-specific APIs.

### Adding Meaning with Xarray

While virtual datasets solve the technical challenge of data access, scientific data needs semantic context to be truly useful. Xarray provides this critical layer, allowing us to transform raw numerical arrays into meaningful scientific data by adding dimensional labels, units, and metadata. This integration fits naturally with our virtual dataset approach – the semantic information can be stored directly in the JSON descriptions, creating complete, self-describing datasets.

In neurophysiology, this combination is particularly powerful. An electrode recording becomes more than just a matrix of numbers when we can label its dimensions as 'time' and 'channel', specify units like 'seconds' and 'microvolts', and attach metadata about sampling rates and electrode positions. Similarly, behavioral tracking data gains clarity when dimensions are labeled as 'frame', 'x', and 'y', with proper spatial units and precise timestamps.

The integration preserves our efficient data access patterns – small coordinate arrays and metadata are encoded directly in the JSON file, while larger coordinate arrays (like timestamps for long recordings) are referenced like the main data. This creates a complete description of both the data's structure and its scientific meaning. The result is a system that combines efficient data access with rich semantic context, enabling sophisticated analyses like selecting data by physical coordinates, automatic alignment of different datasets, and unit-aware computations.

### Practical Applications and Ecosystem Integration

The virtual dataset approach is already demonstrating its value in real-world applications. Neurosift, a web-based visualization platform for neurophysiology data, leverages these capabilities to provide efficient, interactive visualizations of complex neurophysiology datasets. The separation of data description from the data itself enables dynamic updating of metadata, creation of explicit provenance links, and sophisticated combinations of data from different sources - all without modifying the original files.

This approach also complements, rather than replaces, established tools in neuroscience. The rich ecosystem of existing APIs like Neo, NDI, and ONE represents decades of development in sophisticated analysis and data management tools. Since virtual dataset mapping doesn't modify original data files, these APIs can continue to operate alongside it, allowing researchers to use the most appropriate tool for each task. Moreover, these APIs could be enhanced to read virtual dataset descriptions, automatically gaining support for any mapped data format without requiring format-specific implementations.

This integration demonstrates the practical power of the approach: researchers can maintain their existing workflows while gaining the benefits of cloud-native data access and cross-language compatibility. Rather than forcing a choice between approaches, we're building bridges between them, making neurophysiology data more accessible while preserving and enhancing the functionality of existing tools.

### Advanced Data Structures with LINDI

While Kerchunk provides the foundation for virtual datasets, some scientific data formats use sophisticated features that don't map directly to the Zarr specification. HDF5, for instance, uses links and references extensively to represent relationships within complex datasets. LINDI (LiNked Data Interface) extends the virtual dataset approach to handle these advanced structures, making it possible to create complete mappings of complex scientific data without losing important structural information.

This capability is particularly important for neurophysiology data, where relationships between different measurements are crucial - like connecting spike times to their source voltage traces, or linking electrode recordings to their precise spatial positions. By preserving these relationships in our virtual mappings, LINDI enables sophisticated data organization while maintaining the benefits of cloud-native access patterns.

### Virtual NWB: Lowering Barriers to Standardization

The power of this approach becomes clear when applied to the NWB (Neurodata Without Borders) standard. NWB uses HDF5's linking capabilities extensively to organize complex neurophysiology data. Using LINDI, we can create virtual NWB files that maintain all the standard's organizational requirements while pointing to data in its original location and format. This means labs can make their data "NWB-compliant" without converting terabytes of raw data into new files.

Tools like Neurosift already demonstrate the practical benefits of this approach, using Kerchunk and LINDI to enable efficient, cloud-friendly access to NWB data without specialized HDF5 libraries. By converting NWB's complex internal structure into simple Zarr-compatible maps, tools can access specific data directly without processing entire files.

### Extending Standards: BIDS and Beyond

This approach could also help expand existing standards like BIDS (Brain Imaging Data Structure) to support new types of data. Modern neuroscience increasingly incorporates diverse data types - from multi-camera behavioral tracking to complex physiological measurements - each with their own formats. Virtual dataset mappings could make these diverse data types accessible through a common interface while preserving the original files.

For example, a lab might combine pose estimation data stored in CSV files, depth sensor recordings in proprietary formats, and physiological measurements from various devices. Instead of requiring format conversion, researchers could provide standardized JSON descriptions alongside traditional metadata files, maintaining familiar organization while enabling standard access patterns. This flexibility could accelerate the adoption of standards while supporting the growing diversity of neuroscience data.

### Current Limitations and Future Developments

While the virtual dataset approach solves many data standardization challenges, some important gaps remain. MATLAB, despite its widespread use in neuroscience, currently lacks support for the Zarr specification. This limitation affects many research labs, particularly those working with electrophysiology and calcium imaging data. Implementing Zarr support in MATLAB would not only enable virtual dataset access but could also improve cloud storage access for MATLAB's own HDF5-based .mat files.

We're also working to extend these capabilities to existing tools. For instance, we're enhancing Neo, a popular Python library for neurophysiology data, to generate virtual dataset descriptions. This evolution will allow Neo's deep understanding of various data formats to benefit users across all programming languages, not just Python. Instead of acting as a translator, Neo will serve as a cartographer, creating maps that any software can follow.

### When Format Conversion Remains Necessary

While virtual datasets solve many standardization challenges, some scenarios still require traditional format conversion. For instance, proprietary formats that require specialized software libraries can't be fully described in JSON mappings. Similarly, some legacy formats store data in ways that fundamentally limit performance - like splitting what should be a single array across thousands of small files.
In these cases, converting to a modern format like Zarr becomes necessary. The decision to convert should be based on specific technical limitations:

* Reliance on proprietary software for data access
* Inefficient data layout that impacts performance
* Incompatibility with cloud storage and parallel access
* Lack of support for random access or other crucial features

This practical hybrid approach - using virtual datasets where possible and converting formats only when necessary - provides the flexibility needed for real-world neurophysiology research.

# Technical Implementation

The core mechanism uses Kerchunk to map existing data files to the Zarr specification through JSON reference files. These references specify the precise location and structure of data chunks, enabling Zarr-compatible tools to access the original data without conversion. The JSON references contain essential information about array structure, data types, and the location of the underlying bytes in the source files.

### Implementation Complexity Levels

The system accommodates data structures of varying complexity through three distinct implementation levels:

#### Basic Array Mapping
The simplest implementation handles contiguous data files by specifying fundamental array properties: byte offset, shape, and data type. This level suffices for many common neurophysiology file formats that store data as continuous arrays.

#### Chunked Data Structures
The intermediate level addresses more sophisticated data organizations, including multi-file datasets and non-contiguous storage patterns. This level becomes essential when working with formats that distribute data across multiple files or employ chunking strategies.

#### Advanced Format Features
The most sophisticated level handles formats like HDF5 and Zarr that incorporate chunk-wise filtering and compression. This level preserves these advanced features while maintaining efficient access patterns.

## Implementation Examples

### High-Density Electrophysiology Data

Consider a typical high-density electrode recording stored in a binary format, such as the SpikeGLX forat. The Kerchunk reference maps this data to a virtual Zarr array:

```python
{
    "version": 1,
    "refs": {
        ".zgroup": {"zarr_format": 2},
        "ap_band/.zarray": {
            "shape": [18000000, 384],  # 10 min recording @ 30kHz
            "dtype": "<i2",            # 16-bit integers
            "chunks": [18000000, 384]  # Single chunk configuration
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

### Multi-File Calcium Imaging Data

For imaging data stored across multiple TIFF files, the reference structure preserves the relationship between files while presenting them as a unified array:

```python
{
    "version": 1,
    "refs": {
        "images/.zarray": {
            "shape": [1000, 2048, 2048],   # Time x Height x Width
            "chunks": [1, 2048, 2048],     # One frame per chunk
            "dtype": "<u2"                 # 16-bit unsigned integers
        },
        "images/0.0.0": ["vol_0000.tiff", 8, 8388608],
        "images/1.0.0": ["vol_0001.tiff", 8, 8388608]
    }
}
```

These examples demonstrate how the virtual dataset approach maintains the efficiency of native file formats while enabling standardized access patterns.

## Ecosystem Integration and Language Support

The virtual dataset approach enables broad interoperability across the scientific computing ecosystem, with robust support through:
- Python (zarr-python): Full support for parallel computing via Dask and labeled arrays via Xarray
- Julia (Zarr.jl): Native integration with Julia's scientific computing stack
- JavaScript (zarr.js): Enabling web-based visualization and analysis tools like Neurosift

However, significant ecosystem gaps remain. Most notably, MATLAB - which remains widely used in neuroscience for electrophysiology and calcium imaging analysis - currently lacks Zarr specification support. This limitation affects many research labs and highlights broader challenges in scientific computing ecosystems:

1. **Legacy Software Integration**: Many essential scientific tools and analysis pipelines are built in environments that predate modern cloud-native storage solutions. Supporting these tools while enabling cloud workflows requires careful balance.

2. **Historical Data Access**: Research labs have accumulated years of data in format-specific files. For MATLAB users, this is particularly relevant as modern .mat files use HDF5 as their underlying storage format. Adding Zarr support to MATLAB would not only enable virtual dataset access but could also improve cloud access to existing .mat files - allowing selective data access without downloading entire files.

3. **Cross-Language Workflows**: As research increasingly combines multiple tools and languages, gaps in language support become bottlenecks. A researcher might develop analysis code in Python but need to collaborate with colleagues using MATLAB, making universal data access crucial.

# Conclusion

The virtual dataset approach offers a pragmatic solution to scientific data standardization by bridging the gap between format conversion and API-based methods. By using Kerchunk and the Zarr specification to create standardized "maps" of data files, it enables universal data access without the overhead of conversion or language-specific dependencies. This is especially valuable in neurophysiology, where diverse data types and complex workflows are common.

While challenges remain, particularly in ecosystem support and tool integration, this hybrid approach points to a future where researchers can focus on scientific discovery rather than data management. By preserving original data formats while enabling modern analysis capabilities, virtual datasets provide a practical path forward for scientific data standardization that balances efficiency, accessibility, and real-world research needs.