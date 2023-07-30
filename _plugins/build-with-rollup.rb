module RollupPlugin
  class RollupGenerator < Jekyll::Generator
    def generate(site)
      Jekyll.logger.debug("[Rollup]: npm run rollup => #{ENV["JEKYLL_ENV"]}")
      begin
        if ENV["JEKYLL_ENV"] != "production"
          # npm takes aeons to resolve (+2 seconds to every rebuild)
          Jekyll.logger.info("[Rollup DEV]: dispatch async thread")
          Thread.new do
            system("npm run rollup")
          end
        else
          # but we should wait for rollup to finish in production builds
          Jekyll.logger.info("[Rollup PROD]: npm run rollup")
          system("npm run rollup")
        end
      rescue => e
        Jekyll.logger.error(e)
      end
    end
  end
end
