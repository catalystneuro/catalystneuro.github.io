---
title: "The Data Standardization Dilemma: Format vs. API"
date: "2024-01-18"
description: "An exploration of different approaches to data standardization in scientific computing, with a focus on the Kerchunk solution for efficient data access"
readTime: "15 min"
image: "/images/blog/kerchunk/kerchunk_image.png"
keywords: [
  "data standardization",
  "scientific computing",
  "kerchunk",
  "zarr",
  "data formats",
  "API design",
  "cloud computing"
]
---

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

Furthermore, the rise of new analysis techniques, particularly in machine learning, requires standardized, well-structured datasets. Training models across multiple datasets becomes nearly impossible when each dataset uses different conventions and formats. This is particularly problematic in neuroscience, where understanding complex neural systems often requires integrating data across multiple experiments, modalities, and scales.

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

## A Hybrid Solution: Kerchunk-Based Data Standardization

What if we could keep our original data files but still provide standardized access across programming languages? This isn't just a hypothetical question – it's becoming possible through an emerging approach that combines the best of both worlds. The key insight is that we can create a kind of "map" of our data files, describing their contents in a standardized way without actually moving or converting the data itself.

These descriptions use the Zarr format specification as a common language, leveraging its growing support across the scientific computing ecosystem. A crucial advantage of this approach is how it simplifies adding support for new programming languages. Rather than implementing separate readers for each data format in each language, developers only need to implement the logic to parse these standardized JSON descriptions and follow their instructions for reading the data. Once this is done, their implementation automatically works with any data format that has been described in this way.

This cross-language compatibility is further enhanced by the use of JSON for the descriptions themselves. While one research group might use Python to create these data descriptions, another group could read them from MATLAB, and a third from Julia. The descriptions themselves are language-agnostic, serving as a universal blueprint for accessing the data.

This approach scales naturally with the complexity of your data. For simple files – like raw recordings from an electrode – the description might just say "start reading here, and this is how the numbers are stored." For more complex data, like multi-dimensional imaging data split across many files, the description can include sophisticated details about how different pieces fit together, how they might be compressed, and how to efficiently access specific portions of the data.

The beauty of this approach is its flexibility. Research groups can start simple, just describing where their data lives and how to read it. As their needs grow – perhaps they want to optimize for cloud storage or add complex compression – the same framework scales up to handle these advanced use cases. And importantly, this all happens without touching the original data files.

### Enter Kerchunk: Making Virtual Datasets Real

While this idea of creating standardized data maps is powerful in theory, we need practical tools to make it work. This is where Kerchunk comes in. Originally developed to help scientists work with large climate datasets, Kerchunk has emerged as a powerful tool for creating these virtual data mappings.

Kerchunk is particularly notable for its ability to work with HDF5 files – a format commonly used in scientific data storage. It can analyze an HDF5 file and create a detailed JSON description of its contents, effectively creating a virtual Zarr dataset that points back to the original HDF5 file. This is powerful because it means you can use any Zarr-compatible tool to work with HDF5 data without actually converting the data. Even more significantly, once Kerchunk has created these mappings, you no longer need to rely on the HDF5 library (h5lib) to read your data. Instead, you can use more modern, cloud-native data access libraries that are better suited to contemporary computing environments. This liberation from the HDF5 ecosystem can be particularly valuable when working with cloud storage or distributed computing systems.

The "virtual" nature of these datasets is key. When Kerchunk creates a mapping, it's not copying any of the actual data – it's just creating a set of instructions for how to read it. These instructions follow the Zarr specification, which means any tool that knows how to read Zarr data can now read your original data, regardless of its native format. This is particularly valuable in cloud computing environments, where you might want to access specific portions of large datasets without downloading entire files.

For example, imagine you have a large collection of HDF5 files containing neural recording data. Rather than converting all these files to Zarr (which would double your storage requirements), you can use Kerchunk to create virtual Zarr datasets. These virtual datasets can then be read efficiently from any programming language with Zarr support, with the actual data being read directly from the original HDF5 files only when needed.

When Virtual Isn't Enough: The Case for Physical Data Conversion
While the virtual dataset approach is powerful, it's not a universal solution. Some data formats present challenges that can't be solved through virtual mapping alone. For instance, some proprietary formats may require specialized software libraries to read, making it impossible to describe their data layout in a simple JSON mapping. Others might store data in ways that are fundamentally inefficient or incompatible with modern computing needs – like storing what should be a single large array as thousands of tiny files, or using compression formats that don't support random access.
In these cases, we still need to bite the bullet and convert the data into a more suitable format. The good news is that we can be strategic about when we do this. The decision to convert data can be based on clear criteria:

* Does the format require proprietary software to read?
* Is the data layout fundamentally inefficient for common access patterns?
* Would cloud storage and access be prohibitively expensive or slow with the current format?
* Does the format lack support for crucial features like random access or parallel reading?

When these issues arise, converting to a well-designed format like Zarr becomes the pragmatic choice, despite the overhead. The key is making this decision deliberately, based on concrete needs, rather than converting everything by default. This hybrid approach – using virtual datasets where possible and physical conversion where necessary – gives us the best of both worlds.

### How It Works

Rather than creating new JSON schemas, we use Kerchunk to generate references that map existing data files into the Zarr format. Kerchunk creates JSON files that describe:
- The location of data chunks
- Array shapes and data types
- Compression settings (when present)
- References to the original data bytes

This mapping allows any Zarr-compatible tool to treat the original data as if it were a Zarr array, without actually converting the data.

### Implementation Levels

The system naturally supports different levels of complexity:

#### Level 1: Basic Arrays
For simple, contiguous data files, Kerchunk can create straightforward mappings that specify:
- Byte offsets into the original file
- Array shapes and data types
- Basic chunking information

#### Level 2: Chunked Data
For more complex formats, Kerchunk can describe:
- Explicit chunk locations
- Multi-file datasets
- More sophisticated indexing schemes

#### Level 3: Advanced Features
For formats like HDF5 that already support compression and complex chunking:
- Compression specifications
- Hierarchical data structures
- Complex chunk organizations

## Practical Applications and Ecosystem

### Example Use Cases

#### 1. Large Electrophysiology Recordings
Consider a lab collecting high-density electrode recordings stored in flat binary files:
```python
# Kerchunk reference might look like:
{
    "version": 1,
    "refs": {
        "voltage_data/.zarray": {
            "shape": [3600000, 384],  # 1 hour @ 1kHz, 384 channels
            "chunks": [60000, 384],    # 1-minute chunks
            "dtype": "<f4",
            "compressor": null
        },
        "voltage_data/0.0": {
            "ref": "original_recording.bin",
            "offset": 0,
            "size": 92160000  # Bytes for first chunk
        }
        # ... additional chunks
    }
}
```

#### 2. Multi-File Microscopy Data
For a dataset of TIFF stacks spread across multiple files:
```python
{
    "version": 1,
    "refs": {
        "images/.zarray": {
            "shape": [1000, 2048, 2048],
            "chunks": [1, 2048, 2048],  # Each TIFF is one chunk
            "dtype": "<u2"
        },
        "images/0.0.0": {"ref": "stack_0000.tiff", "offset": 8, "size": 8388608},
        "images/1.0.0": {"ref": "stack_0001.tiff", "offset": 8, "size": 8388608}
        # ... additional files
    }
}
```

### Integration with Existing Tools

The power of this approach becomes clear when we consider the ecosystem of tools that can immediately work with this data:

1. **Analysis Libraries**
   - Dask for parallel computing
   - XArray for labeled arrays
   - Zarr-based visualization tools
   - Cloud storage systems (S3, GCS)

2. **Language Support**
   - Python via zarr-python
   - MATLAB via zarr-matlab
   - Julia via Zarr.jl
   - JavaScript via zarr.js

### Performance Optimization Strategies

#### Chunk Organization
- Match chunks to natural data boundaries (e.g., image frames, time blocks)
- Consider memory and network transfer patterns
- Balance chunk size for parallel processing

#### Caching
- Implement intelligent chunk caching
- Use memory mapping when appropriate
- Consider hierarchical storage (memory/local disk/cloud)

### Handling Special Cases

#### 1. Vendor-Specific Formats
For proprietary formats that require special DLLs:
- Create reference generators that use vendor SDKs
- Cache extracted metadata to avoid repeated SDK calls
- Document format-specific limitations

#### 2. Time-Varying Data
For streaming or growing datasets:
- Use expandable Zarr arrays
- Implement atomic reference updates
- Handle partial chunk reads/writes

### Cloud Integration

This approach is particularly powerful in cloud environments:

1. **Cloud-Native Access**
   - Direct access to cloud storage
   - No need to download full datasets
   - Parallel chunk access

2. **Cost Optimization**
   - Minimize data transfer
   - Cache frequently accessed chunks
   - Optimize for cloud storage pricing models

### Building the Ecosystem

To make this approach successful, we need:

1. **Reference Generators**
   - Format-specific tools
   - Automatic format detection
   - Validation tools

2. **Performance Tools**
   - Chunk analysis tools
   - Access pattern profiling
   - Optimization recommendations

3. **Documentation and Examples**
   - Format-specific guides
   - Performance best practices
   - Migration tutorials

## Adding Semantic Context with Xarray Integration

While Kerchunk gives us the physical layout of the data, Xarray integration allows us to add crucial semantic meaning to our datasets. This combination provides both efficient access and rich contextual information about what the data represents.

### Example: Annotated Electrophysiology Data

Here's how we might extend our earlier electrophysiology example with Xarray-compatible metadata:

```python
{
    "version": 1,
    "refs": {
        "voltage_data/.zarray": {
            "shape": [3600000, 384],
            "chunks": [60000, 384],
            "dtype": "<f4"
        },
        "voltage_data/.zattrs": {
            "dims": ["time", "channel"],
            "coordinates": {
                "time": {
                    "data": {"ref": "time_index.bin"},
                    "attrs": {
                        "units": "seconds",
                        "start_time": "2024-01-18T10:00:00",
                        "sampling_rate": 1000
                    }
                },
                "channel": {
                    "data": {"ref": "channel_positions.bin"},
                    "attrs": {
                        "units": "micrometers",
                        "probe_type": "Neuropixels 1.0",
                        "coordinate_system": "probe_centered"
                    }
                }
            }
        }
    }
}
```

### Benefits of Xarray Integration

1. **Self-Describing Data**
   - Dimensions have meaningful names
   - Units are explicitly specified
   - Coordinate systems are defined
   - Metadata is machine-readable

2. **Enhanced Analysis Capabilities**
   - Select data by physical coordinates
   - Automatic alignment of different datasets
   - Unit-aware computations
   - Smart broadcasting based on dimensions

3. **Interoperability**
   - Common interface across data types
   - Compatible with Dask for parallel computing
   - Easy conversion to other formats (NetCDF, etc.)
   - Integration with visualization tools


### Current Limitations

#### Language Support Gaps
- No MATLAB implementation of Zarr exists, which is significant given MATLAB's widespread use in scientific computing
- Limited support in other scientific computing environments

#### Technical Limitations
- The current zarr-python implementation cannot efficiently read regions of unchunked flat datasets
  - Unlike HDF5, which can read arbitrary regions of contiguous data
  - Forces users to either chunk their data (increasing complexity and potentially storage) or read more data than necessary
  - This is particularly problematic for large, simple binary files where chunking adds unnecessary overhead

#### Practical Implications
These limitations mean that:
1. For simple flat binary files, HDF5 might still be a better choice if partial reads are important
2. Users might need to maintain multiple versions of data (chunked and unchunked) for different use cases
3. Performance optimization becomes more complex since you can't easily balance between chunked and unchunked access patterns
