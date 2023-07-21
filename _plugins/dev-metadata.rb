module Jekyll
  class GithubMetadataFallback < Generator
    def generate(site)
      if ENV["JEKYLL_ENV"] == "development"
        site.config["github"] = {
          "repository_url" => "#link-to-repository?source=inactive-plugin&env=development",
          "build_revision" => "1337420"
        }
      end
    end
  end
end
