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
#    - repository_url -> https://github.com/ + github_username (as defined in config.yml)
#    - build_revision -> "ERRx404"
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

    def assign_git_values(site)
      say("set missing values") if site.config["github"].nil?
      site.config["github"] ||= {
        "repository_url" => retrieve_git_repository_url(site),
        "build_revision" => retrieve_git_revision,
      }
    end

    def say(speech, tone = nil)
      orator = Jekyll.logger
      voice = self.class.name.split("::").last
      remark = "[#{voice}]: " + speech
      case tone
      when "err" then orator.error(remark)
      when "warn" then orator.warn(remark)
      when "debug" then orator.debug(remark)
      else orator.info(remark)
      end
    end

    def retrieve_git_revision
      rev = `git rev-parse HEAD`.strip
      rev.empty? ? "NO_HEAD" : rev
    rescue Errno::ENOENT => e
      say(e, "warn")
      "ERRx404"
    rescue StandardError => e
      say(e, "err")
    end

    def retrieve_git_repository_url(site)
      fallback = (site.config["repository_url"] ||
                  ("https://github.com/" +
                   site.config["github_username"]) ||
                  "").strip
      url = `git config --get remote.origin.url`.strip.chomp(".git")
      url.empty? ? fallback : url
    rescue Errno::ENOENT => e
      say(e, "warn")
      fallback
    rescue StandardError => e
      say(e, "err")
    end
  end
end
