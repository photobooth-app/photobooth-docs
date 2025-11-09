# Installation

## Prerequisites

- TODO

## Software Setup

### Automated Installation using Ansible

```sh
sudo apt update
sudo apt full-upgrade

sudo apt install -y python3-picamera2 python3-opencv python3-pip pipx git vim
```

### Configure the Nodes

The nodes are configured using .env files

#### Primary Node

The primary node has a display attached and is responsible to generate the clock signal the secondary nodes synchronize to. To save hardware, a primary node can be used as secondary node simultaneously.

#### Secondary Nodes

## First Start

xxx

## Local dev installation

```sh
cd ~
git clone https://github.com/photobooth-app/wigglecam.git
cd wigglecam

# to allow system site packages be used in venv (picamera2)
pdm venv create --force 3.11 --system-site-packages

pdm install

pdm run wigglecam_minimal # or wigglecam_api, maybe add QT_QPA_PLATFORM=linuxfb if display is used.
```
