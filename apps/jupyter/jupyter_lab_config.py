# jupyter_lab_config.py
from traitlets.config import get_config
# flake8: noqa
# pylint: disable=E0602

c = get_config()

# Jupyter Lab Configuration
c.ServerApp.ip = '0.0.0.0'
c.ServerApp.port = 8888
c.ServerApp.open_browser = False
c.ServerApp.allow_root = True
c.ServerApp.token = ''
c.ServerApp.password = ''
c.ServerApp.notebook_dir = '/workspace'
c.ServerApp.allow_origin = '*'
c.ServerApp.disable_check_xsrf = True

# Enable extensions
c.ServerApp.jpserver_extensions = {
    'jupyterlab': True
}

# Resource limits
c.MappingKernelManager.default_kernel_name = 'python3'
