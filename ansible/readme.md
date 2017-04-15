The [ansible](https://www.ansible.com/) playbooks in this directory can be used to setup a docker registry with registryfront hosted on a [Digital Ocean](https://www.digitalocean.com/) droplet.

Setup the droplet name, size and region in `droplet_vars.yml` and then run the `setup.yml` playbook like this:

    API_TOKEN=YOUR_DIGITAL_OCEAN_API_TOKEN ansible-playbook setup.yml

This will ensure that your `~/.shh/id_rsa.pub` is present on your Digital Ocean account, use it to create a droplet, install docker on it and start registry and registryfront containers.

You can destroy the droplet again with the `destroy.yml` playbook, like this:
   
    API_TOKEN=YOUR_DIGITAL_OCEAN_API_TOKEN ansible-playbook destroy.yml
