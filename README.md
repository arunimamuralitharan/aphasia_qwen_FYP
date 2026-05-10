# NeuroPheno

**End-to-End Audio-Language Framework for Automated Aphasia Assessment**

## Overview

NeuroPheno is an end-to-end multimodal AI framework for automated aphasia classification directly from raw speech signals. Unlike traditional cascaded ASR–NLP pipelines, NeuroPheno eliminates the transcription layer and processes acoustic and linguistic features jointly using a Large Audio-Language Model (LALM).

The system is built on **Qwen2-Audio-7B-Instruct**, fine-tuned using **Parameter-Efficient Fine-Tuning (LoRa)** with 4-bit NF4 quantization to enable deployment on consumer-grade GPUs. NeuroPheno integrates explainable AI (XAI) mechanisms to improve clinical transparency and trust.

---

## Key Features

* End-to-end raw speech processing (no intermediate transcription)
* Fine-tuned Qwen2-Audio-7B using LoRa (PEFT)
* 4-bit NF4 quantization for efficient GPU deployment
* SHAP-based global feature attribution
* Attention-based temporal saliency visualization
* Chain-of-Thought structured clinical reasoning outputs
* Flask-based REST API for clinical deployment
* Automated PDF diagnostic report generation
* Inference latency < 90 seconds on NVIDIA T4 GPU

---

## Motivation

Traditional automated aphasia detection systems rely on Automatic Speech Recognition (ASR) followed by NLP analysis. These approaches:

* Lose prosodic and acoustic biomarkers (pauses, fluency disruptions, articulation variability)
* Accumulate transcription errors
* Operate as black-box classifiers with limited clinical transparency

NeuroPheno addresses these challenges by:

* Preserving acoustic biomarkers through direct audio modeling
* Providing structured reasoning outputs
* Offering interpretable feature attributions
* Supporting deployment in resource-constrained healthcare environments

---

## Architecture

### 1. Audio Processing

* Raw audio input (.wav/.mp3)
* Mel-filterbank feature extraction
* Signal normalization and preprocessing

### 2. Backbone Model

* Qwen2-Audio-7B-Instruct
* Whisper-large-v2 audio encoder
* 7B parameter transformer language model
* Cross-modal projector for acoustic-text embedding alignment

### 3. Fine-Tuning Strategy

* Parameter-Efficient Fine-Tuning (LoRa)
* Backbone weights frozen
* Low-rank adaptation matrices inserted in attention layers
* 4-bit NF4 quantization using BitsAndBytes (QLoRA setup)

### 4. Explainability Modules

* SHAP feature attribution (fluency, pauses, syntactic complexity, repetition rate)
* Multi-head attention temporal visualization
* Chain-of-Thought diagnostic rationale generation

### 5. Deployment Layer

* Flask REST API backend
* Browser-based frontend with waveform visualization
* Structured diagnostic report generation (PDF output)

---

## Installation

### Requirements

* Python 3.10+
* PyTorch
* Transformers
* BitsAndBytes
* PEFT
* SHAP
* Flask
* CUDA-enabled GPU (recommended: NVIDIA T4 or L4 with 16GB VRAM)

### Setup

```bash
git clone https://github.com/your-username/neuropheno.git
cd neuropheno
pip install -r requirements.txt
```

---

## Running Inference

Start the Flask server:

```bash
python app.py
```

Then open:

```
http://localhost:5000
```

Upload a speech recording to receive:

* Predicted aphasia subtype
* Confidence score
* SHAP feature importance chart
* Attention-weighted waveform
* Downloadable diagnostic PDF

---

## Ethical Considerations

* Audio processed in-memory during inference
* No personally identifiable information stored
* Designed as a decision-support tool
* Not intended for autonomous medical diagnosis

---

## Limitations

* Limited speaker diversity (160 speakers)
* English-only training
* Requires larger multilingual validation
* Model-generated rationales are explanatory, not clinically certified

---

## Future Work

* Multilingual expansion
* Larger speaker-independent datasets
* Human-in-the-loop clinical validation
* Integration with neuroimaging modalities
* Edge-device deployment optimization

---

## Contribution to Sustainable Development Goals

NeuroPheno supports:

* **SDG 3 – Good Health and Well-being**
  By improving early detection and accessibility of neurological screening tools.

* **SDG 10 – Reduced Inequalities**
  By enabling scalable deployment in rural and resource-constrained healthcare settings.

---

## Citation

If you use this work, please cite:

```
NeuroPheno: End-to-End Audio-Language Modeling for Aphasia Assessment, 2026.
```

---

## License

This project is intended for academic and research purposes.
Clinical deployment requires appropriate regulatory and institutional approvals.
