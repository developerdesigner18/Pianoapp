import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Soundfont from 'soundfont-player';

const SoundfontProvider = ({
  instrumentName,
  hostname,
  format,
  soundfont,
  audioContext,
  render,
}) => {
  const [activeAudioNodes, setActiveAudioNodes] = useState({});
  const [instrument, setInstrument] = useState(null);

  useEffect(() => {
    const loadInstrument = async () => {
      // Re-trigger loading state
      setInstrument(null);
      try {
        const loadedInstrument = await Soundfont.instrument(audioContext, instrumentName, {
          format,
          soundfont,
          nameToUrl: (name, soundfont, format) => {
            return `${hostname}/${soundfont}/${name}-${format}.js`;
          },
        });
        console.log(loadedInstrument,'inst')
        setInstrument(loadedInstrument);
      } catch (error) {     
        console.error('Error loading instrument:', error);
      }
    };

    loadInstrument();
  }, [instrumentName, audioContext, format, soundfont, hostname]);

  const playNote = (midiNumber) => {
    audioContext.resume().then(() => {
      const audioNode = instrument.play(midiNumber);
      setActiveAudioNodes((prevActiveAudioNodes) => ({
        ...prevActiveAudioNodes,
        [midiNumber]: audioNode,
      }));
    });
  };

  const stopNote = (midiNumber) => {
    audioContext.resume().then(() => {
      if (!activeAudioNodes[midiNumber]) {
        return;
      }
      const audioNode = activeAudioNodes[midiNumber];
      audioNode.stop();
      setActiveAudioNodes((prevActiveAudioNodes) => ({
        ...prevActiveAudioNodes,
        [midiNumber]: null,
      }));
    });
  };

  // Clear any residual notes that don't get called with stopNote
  const stopAllNotes = () => {
    audioContext.resume().then(() => {
      const activeNodes = Object.values(activeAudioNodes);
      activeNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      setActiveAudioNodes({});
    });
  };

  return render({
    isLoading: !instrument,
    playNote,
    stopNote,
    stopAllNotes,
  });
};

SoundfontProvider.propTypes = {
  instrumentName: PropTypes.string.isRequired,
  hostname: PropTypes.string.isRequired,
  format: PropTypes.oneOf(['mp3', 'ogg']),
  soundfont: PropTypes.oneOf(['MusyngKite', 'FluidR3_GM']),
  audioContext: PropTypes.instanceOf(window.AudioContext),
  render: PropTypes.func,
};

SoundfontProvider.defaultProps = {
  format: 'mp3',
  soundfont: 'MusyngKite',
  instrumentName: 'acoustic_grand_piano',
};

export default SoundfontProvider;
