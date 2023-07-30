module RollupPlugin
  class RollupGenerator < Jekyll::Generator
    def generate(site)
      begin
        if ENV["JEKYLL_ENV"] != "production"
          # Run async in dev because npm takes aeons to resolve
          Thread.new do
            system("npm run rollup")
          end
        else
          # Run synchronously in prod to ensure proper build
          system("npm run rollup")
        end
      rescue => e
        Jekyll.logger.error(e)
      end
    end
  end
end
