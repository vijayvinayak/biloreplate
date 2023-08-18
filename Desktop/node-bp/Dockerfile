FROM registry.gitlab.com/wilko2030/omni/apps-services/base-images/node-16:latest
USER root
ENV APP_HOME=/opt/app

WORKDIR $APP_HOME

COPY . .

RUN chown -R appuser:appuser $APP_HOME

USER appuser
CMD ["node", "src/app.js"]

