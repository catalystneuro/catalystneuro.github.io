# Papers behind the converted dandisets

`src/data/dataset-papers.json` lists the papers that DANDI records as describing the
dandisets linked from the NWB conversion pages. It feeds the second section of the
Publications page. Regenerate it after adding conversion pages:

```sh
python3 scripts/dataset-papers/fetch.py . /tmp/raw.json
python3 scripts/dataset-papers/clean.py /tmp/raw.json src/data/dataset-papers.json
```

`fetch.py` reads each dandiset's `relatedResource` entries from the DANDI API (embargoed
dandisets are skipped). `clean.py` keeps articles and preprints, resolves each to a DOI,
takes the title, venue and year from Crossref (a title search is accepted only on an exact
title match), and drops a preprint when the published version of the same paper is listed.
Review the diff before committing.
