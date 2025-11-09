
# Troubleshooting

## Test the communication

Every node listens on 3 ports, in default 5550, 5551 and 5552. When the software runs on the node, the ports need to be accessible from the main computer on which the photobooth-app is installed.

So on the main computer, put the following command in the terminal (Linux only) and check the results. If there is an error, either the network or the software is not setup properly.

```sh
nc -zv wiggle1_OR_OTHER_HOSTNAME 5550 5551 5552
```
