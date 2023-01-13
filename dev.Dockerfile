FROM node:18.13

RUN apt update && apt install curl git htop make nano openssh-server sudo vim zsh -y

# Install Oh My Zsh & Use Zsh as default
RUN curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh
RUN chsh -s $(which zsh)

# === Begin SSH Configuration ===

RUN mkdir /var/run/sshd

# Configure SSH
RUN sed -ir 's/^#?PasswordAuthentication\s+.*/PasswordAuthentication no/' /etc/ssh/sshd_config

# Export PATH for SSH connection
RUN echo "export PATH=${PATH}" >> /root/.zshrc
# Set default directory for SSH connection
RUN echo "cd /usr/src" >> /root/.zshrc

# Copy entrypoint script
WORKDIR /tmp
COPY docker-entrypoint.dev.sh docker-entrypoint.sh
RUN chmod u+x docker-entrypoint.sh

# Copy SSH public key
RUN mkdir /root/.ssh
WORKDIR /root/.ssh
COPY --chown=root *.pub authorized_keys
RUN chmod 600 authorized_keys

# Prepare for the volume mapping
RUN cp -r /root /tmp/root

# === end SSH Configuration ===

WORKDIR /usr/src

EXPOSE 3000
EXPOSE 5173

ENTRYPOINT [ "/bin/bash", "-c", "/tmp/docker-entrypoint.sh" ]
