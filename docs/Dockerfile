FROM python

WORKDIR /docs

COPY . .

RUN bash ./scripts/install_mkdocs.sh

EXPOSE 8000

CMD [ "bash", "./scripts/serve_docs.sh" ]