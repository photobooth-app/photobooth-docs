# Install the Nodes

## Prerequisites

- Ansible installed on your computer to steer the installations and later updates.
- Nodes are a Raspberry Pi
- Latest Trixie 64bit lite installed on every node. Use the RPi Imager to write the SD-cards. Ensure to allow login ssh-key based and the hostname is wiggle0, wiggle1, ...
- The nodes are accessible from your computer and the computer running the photobooth-app by hostname/IP.

## Software Setup

### Assumptions

To keep the installation guid lean, following assumptions are made. If you have a different setup, you need to adjust the installation procedure on your own.

- Our computer runs on linux. Windows is also OK, but we do not describe the installation here.
- Nodes use `pi` as username.
- 4 camera nodes, hostnames start 0 based indexing like wiggle0, wiggle1, ...
- Every node is configured the same, a Raspberry Camera Module 3 is used for each node.

### Prepare the Automated Installation using Ansible

Ensure you have ansible installed:

```sh
ansible --version
```

Now create a working directory that will hold your configuration. You use it later again when you need to update the nodes.

```sh
cd ~
mkdir ansible-wigglenodes
cd ansible-wigglenodes
```

Now create `hosts.ini` in the newly created directory.

```sh title="hosts.ini"
[wigglenodes] # group
wiggle0 ansible_user=pi software_sync_role=server device_id=0 camera=picam
wiggle1 ansible_user=pi software_sync_role=client device_id=1 camera=picam
wiggle2 ansible_user=pi software_sync_role=client device_id=2 camera=picam
wiggle3 ansible_user=pi software_sync_role=client device_id=3 camera=picam
```

Now test that the nodes can be accessed using ansible by sending a simple ping. It will send a ping-pong request to the group `wigglenodes` defined in the `hosts.ini` inventory file.

```sh
ansible wigglenodes -i hosts.ini -m ping
```

### Run the Automated Installation using Ansible

Download the latest playbook:

```sh
git clone https://github.com/photobooth-app/ansible.git
```

```sh
ansible-playbook playbooks/install_nodes.yaml -i inventories/hosts.ini 
```

### Advanced Configuration

The nodes are configured using .env files
