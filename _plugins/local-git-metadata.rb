# My 'fun' introduction to Ruby:
#
# A Jekyll plugin to propagate the site.github namespace using local git metadata
#
# This is useful for cases when remote metadata cannot be retrieved
# e.g. offline dev environments, API unreachable, rate-limited, etc..
# or in cases where local metadata is preferential to remote metadata
# Fallback options are provided when local git metadata is not present
#
# Conditional assignment is used in conjunction with a low priority
# to ensure that no values are overwritten.
#
# If Git is not available in the environment, default values are used.
# Default (No Git):
#    - repository_url: https://github.com/ + repository(as defined in config.yml)
#    - build_revision: "ERRx404"
#
# TODO: bundle and build gem-based plugin
# TODO: use 'git' gem instead of shell environment
module Jekyll
  class LocalGitMetadata < Generator
    priority :low

    def generate(site)
      assign_git_values(site)
    rescue StandardError => e
      say(e, "err")
    end

    private

    def plugin_name
      self.class.name.split("::").last
    end

    def assign_git_values(site)
      say("set missing values") if site.config["github"].nil?
      site.config["github"] ||= {
        "repository_url" => retrieve_git_repository_url(site),
        "build_revision" => retrieve_git_revision
      }

    end

    def say(what, tone = nil)
      put = Jekyll.logger
      if tone == "err"
        put.error("[#{plugin_name}]:", what)
      elsif tone == "warn"
        put.warn("[#{plugin_name}]:", what)
      elsif tone == "debug"
        put.debug("[#{plugin_name}]:", what)
      else
        put.info("[#{plugin_name}]:", what)
      end
    end

    def retrieve_git_revision
      begin
        rev = `git rev-parse HEAD`.strip
        rev.empty? ? "NO_HEAD" : rev
      rescue Errno::ENOENT => e
        say(e, "warn")
        "ERRx404"
      end
    end

    def retrieve_git_repository_url(site)
      repo_fallback = "https://github.com/" + (site.config["repository"] || "https://github.com/")
      begin
        repo_url = `git config --get remote.origin.url`.strip.chomp(".git")
        repo_url.empty? ? repo_fallback : repo_url
      rescue Errno::ENOENT => e
        say(e, "warn")
        repo_fallback
      end
    end
  end
end
